import { performBackup } from './backup'

/**
 * 独立的备份脚本
 * 可以直接运行来备份 generate 目录到 generate_backup 目录
 */
async function main() {
  try {
    console.log('=== Generate Files Backup Script ===')
    await performBackup()
    console.log('=== Backup completed successfully ===')
  } catch (error) {
    console.error('=== Backup failed ===')
    console.error(error)
    process.exit(1)
  }
}

main()
