import path from 'node:path'
import fs from 'node:fs'

/**
 * 备份 generate 目录到 generate_backup 目录
 */
export async function backupGenerateFiles(): Promise<void> {
  try {
    const generateDir = path.resolve(process.cwd(), './src/generate')
    const backupDir = path.resolve(process.cwd(), './src/generate_backup')

    // 确保备份目录存在
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    // 检查 generate 目录是否存在
    if (!fs.existsSync(generateDir)) {
      console.log('Generate directory does not exist, skipping backup')
      return
    }

    // 读取 generate 目录中的所有文件
    const files = fs.readdirSync(generateDir)

    console.log('Starting backup of generate files...')

    for (const file of files) {
      const sourcePath = path.join(generateDir, file)
      const backupPath = path.join(backupDir, file)

      // 检查是否为文件
      if (fs.statSync(sourcePath).isFile()) {
        // 复制文件到备份目录
        fs.copyFileSync(sourcePath, backupPath)
        console.log(`Backed up: ${file}`)
      }
    }

    console.log('Backup completed successfully!')
  } catch (error) {
    console.error('Backup failed:', error)
    throw error
  }
}

/**
 * 清理备份目录中的旧文件
 */
export async function cleanBackupDirectory(): Promise<void> {
  try {
    const backupDir = path.resolve(process.cwd(), './src/generate_backup')

    if (fs.existsSync(backupDir)) {
      const files = fs.readdirSync(backupDir)

      console.log('Cleaning backup directory...')

      for (const file of files) {
        const filePath = path.join(backupDir, file)
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath)
          console.log(`Removed old backup: ${file}`)
        }
      }
    }
  } catch (error) {
    console.error('Clean backup directory failed:', error)
    throw error
  }
}

/**
 * 执行完整的备份流程：清理旧备份 -> 创建新备份
 */
export async function performBackup(): Promise<void> {
  try {
    await cleanBackupDirectory()
    await backupGenerateFiles()
  } catch (error) {
    console.error('Backup process failed:', error)
    throw error
  }
}
