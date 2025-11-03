```
pipeline {
    agent any

    parameters {
        choice(name: 'APP_ENVIRONMENT', choices: ['app2', 'demo','app10','app4','robot2','robot','wcl'], description: 'Select the application environment to read configuration')
        string(
            name: 'BRANCH_NAME',
            defaultValue: 'v1.5.1',
            description: 'branch name:v1.5.1、master、dev'
        )
    }
    environment {
        GIT_REPO = 'https://gitea.wclsolution.com/DocPal/ui_v4.git'
        BASE_IMAGE = 'docpal-ui-image:latest'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    cleanWs()
                }
            }
        }
        stage('Read Config File') {
            steps {
                configFileProvider([configFile(fileId: 'ecc66f2e-8ed1-4536-9f51-c0dd1f6e6f45', variable: 'CONFIG_FILE')]) {
                    script {
                        // 使用 readYaml 读取 YAML 文件
                        def config = readYaml(file: CONFIG_FILE)

                        // 获取全局配置
                        def globalConfig = config.global
                        env.NODE_OPTIONS = globalConfig.nodeOptions

                        // 获取环境配置
                        def selectedEnv = params.APP_ENVIRONMENT
                        def envConfig = config.environments[selectedEnv]

                        // 将环境配置存储到环境变量中
                        env.USERNAME = envConfig.username
                        env.IP = envConfig.ip
                        env.DOCPAL_USER = envConfig.docpalUser
                        env.DOCPAL_PASSWORD = envConfig.docpalPassword
                        env.ENV_FILE = envConfig.envFile
                        env.STATIC_PATH = envConfig.staticPath
                        env.ADMIN_URL = envConfig.adminUrl
                        env.CLIENT_URL = envConfig.clientUrl
                        env.PUBLIC_URL = envConfig.publicUrl
                        env.TEMPLATE_URL = envConfig.templateUrl
                    
                    }
                }
            }
        }
        
        stage('Checkout Code') {
            steps {
                script {
                    // git branch: params.BRANCH_NAME, url: env.GIT_REPO, credentialsId: 'jenkins'
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: params.BRANCH_NAME]],
                        userRemoteConfigs: [[
                            url: env.GIT_REPO,
                            credentialsId: 'jenkins'
                        ]],
                        extensions: [[$class: 'SubmoduleOption',
                                      recursiveSubmodules: true,
                                      trackingSubmodules: false,
                                      parentCredentials: true, 
                                      reference: '',
                                      timeout: 10]]
                    ])
                }
            }
        }
        
        stage('Build Docker Image') {  
            steps {  
                script {  
                    // 构建镜像，加载最新基础镜像  
                    docker.build(env.BASE_IMAGE, "--pull -f Dockerfile-build .")  
                    echo "Docker image built: ${env.BASE_IMAGE}"   
                }  
            }  
        } 
        
        stage('Compile & Generate Code in Container') {  
            steps {  
                script {  
                    docker.image(env.BASE_IMAGE).inside('--network host') {  
                        def selectedEnv = params.APP_ENVIRONMENT
                        def deployEnv = "../../env/.env.${selectedEnv}.client"
                        
                        echo "Selected Environment: ${selectedEnv}"
                        echo "Deploy Environment File: ${deployEnv}"
                        sh """  
                            set -ex  
                            # init submodule
                            # Install dependencies with caching
                            node ./libraries/deployment/index.js --ADMIN_URL "${ADMIN_URL}" --CLIENT_URL "${CLIENT_URL}" --PUBLIC_URL "${PUBLIC_URL}" --TEMPLATE_URL "${TEMPLATE_URL}"
                            node ./libraries/deployment/deploy-language.js --ADMINURL ${ADMIN_URL}/api --SUPERADMIN "Administrator" --PASSWORD "2'KMzF}zK2ZmwQe"
                            
                            pnpm install --shamefully-hoist --no-frozen-lockfile
        
                            # Start deployment in the background
                        
                            
                            # Generate code in parallel
                            
                            
                            NODE_OPTIONS="${NODE_OPTIONS}" pnpm -F client generate --dotenv "${deployEnv}" &
                            
        
                            # Wait for all background processes to finish
                            wait
                        """ 
                    }  
                }  
            }  
        }
    
        
        stage('Execute Commands and Upload Files on Remote Host') {
            steps {
                script {
                    sshagent(['jenkins-ssh-key']) {
                        
                        // 1. 先检查本地输出目录是否存在
                        sh """
                            echo "===== 开始检查本地构建输出文件 ====="
                            
                            # 检查 client 输出目录
                            CLIENT_DIR="${env.WORKSPACE}/apps/client/.output/public"
                            if [ ! -d "\${CLIENT_DIR}" ]; then
                                echo "错误：client 输出目录不存在！路径：\${CLIENT_DIR}"
                                exit 1
                            fi
                            echo "✅ client 输出目录检查通过"
                            
                            # 检查 pdfjs 输出目录（根据实际上传路径）
                            PDFJS_DIR="${env.WORKSPACE}/libraries/pdf-js/build/generic"
                            if [ ! -d "\${PDFJS_DIR}" ]; then
                                echo "错误：pdfjs 输出目录不存在！路径：\${PDFJS_DIR}"
                                exit 1
                            fi
                            echo "✅ pdfjs 输出目录检查通过"
                            
                            echo "===== 所有本地输出文件检查通过 ====="
                        """
                        
                        // 2. 添加主机到已知列表（避免首次连接提示）
                        sh """
                            mkdir -p ~/.ssh
                            chmod 700 ~/.ssh
                            ssh-keyscan -H ${IP} >> ~/.ssh/known_hosts
                        """
        
                        // 3. 执行远程命令（修复heredoc语法）
                        sh """
                            ssh -o ConnectTimeout=30 -o StrictHostKeyChecking=no ${USERNAME}@${IP} /bin/bash <<'REMOTE_SCRIPT'
                            #!/bin/bash
                            echo "▬▬▬ 正在清理旧文件 ▬▬▬"
                            cd ${STATIC_PATH} || exit 1
                            echo "当前工作目录: \$(pwd)"
                            
                            rm -rf "client"
                            mkdir -p "client"
                            chmod 755 "client"
                            echo "已创建目录: \$(pwd)/client"
                            
                            echo "▬▬▬ 目录准备完成 ▬▬▬"
REMOTE_SCRIPT
                        """
        
                        // 上传文件  
                        sh """
                            # 创建目标目录（如果不存在）
                            ssh ${USERNAME}@${IP} "mkdir -p ${STATIC_PATH}/{client}" || true
                            
                            # 上传并解压 client
                            cd ${env.WORKSPACE}/apps/client/.output/public || exit 1
                            tar czf - . | ssh ${USERNAME}@${IP} "tar xzf - -C ${STATIC_PATH}/client" || true
                            
                            # 上传并解压 public
                            # cd ${env.WORKSPACE}/apps/public/.output/public || exit 1
                            # tar czf - . | ssh ${USERNAME}@${IP} "tar xzf - -C ${STATIC_PATH}/public" || true
                            
                            # 上传并解压 admin
                            cd ${env.WORKSPACE}/libraries/pdf-js/build/generic || exit 1
                            tar czf - . | ssh ${USERNAME}@${IP} "tar xzf - -C ${STATIC_PATH}/resources/pdfjs" || true
                        """
                    
                    }
                }
            }
        }
    }
    
}
```
