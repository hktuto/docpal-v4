<template>
    <div class="LoginContainer">
        <LoadingBg></LoadingBg>
        <div class="fromContainer card glass">
            <Logo class="logo" mode="withName"/>
        <template v-if="status === 'submitted'">
            <div class="tip">
              {{$t('The operation is successful, please go to the mailbox to reset the password')}}
            </div>
          </template>
          <template v-else>
            <el-form label-position="top" ref="FormRef" :status-icon="true" :model="form" @submit.native.prevent>
              <template v-if="status === 'beforeSubmit'">
                  <el-form-item :label="$t('login_username')" prop="userId" class="intro"
                            :rules="[{ required: true, message: $t('form_common_requird')}]">
                    <el-input v-model="form.userId" type="text" @keyup.enter.native="handleSubmit"/>
                  </el-form-item>
                  <el-button class="fullSize" type="primary" size="large" :block="true" @click="handleSubmit" :loading="loading">
                          {{ $t('dpButtom_confirm') }}
                  </el-button>
              </template>
            </el-form>
          </template>
          <el-button class="intro" @click="login" link>
            {{ $t('login') }}
          </el-button>
          <div v-if="state.time > 0">
            <h3>
              {{$t('dpTip_autoLogin')}}: {{state.time}}s 
            </h3>
          </div>
        </div>
    </div>
</template>
    
    
<script lang="ts" setup>
    import { ElMessage} from 'element-plus'
    import {clientApi } from 'api'
    const { public: { DEFAULT_PATH } } = useRuntimeConfig(); 
    const status = ref('beforeSubmit')
    const loading = ref(false)
    const router = useRouter()
    const { t } = useI18n()
    const state = reactive<any>({
      time: 0,
      timer: null
    })
    const form = ref({
        userId: '',
        password: '',
        confirmPassword: '',
    
    })
    
    const FormRef = ref()
    // #region module: before submit form
    async function handleSubmit () {
        const valid = FormRef.value.validate()
        if(!valid) return
    
        loading.value = true
        try {
            const {data} = await clientApi.api.postNuxeoUserForgetpassword({userId:form.value.userId})
          if (data) status.value = 'submitted'
          ElMessage.success(t('dpMsg_success'))
          returnLogin()
        } catch (error) {
          
        }
        loading.value = false
    }
    
    function returnLogin () {
        if(!!state.timer) clearInterval(state.timer)
        state.time = 5
        state.timer = setInterval(() => {
            state.time --
            if(state.time === 0) {
                clearInterval(state.timer)
                login()
            }
        }, 1000)
    }
    function login() {
        router.push({
          path: '/'
        })
    }
    </script> 
    
    
    <style scoped lang="scss">
    .LoginContainer{
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      padding: var(--el-component-size-small);
    }
    .fromContainer{
        min-width: 300px;
        max-width: 600px;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: stretch;
    }
    .logo{
        width: 80%;
        max-width: 200px;
        margin: 0 auto var(--el-component-size-small) auto;
    }
    .tip {
      padding: var(--app-padding);
      font-size: 1.2rem;
      text-align: center;
      color: var(--color-grey-500);
    }
    </style>