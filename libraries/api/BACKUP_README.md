# API 生成文件备份功能

## 概述

这个备份功能会在运行 API 生成器时自动将 `./generate` 目录中的文件备份到 `./generate_backup` 目录。

## 功能特性

- **自动备份**: 在生成新文件之前自动备份现有文件
- **清理旧备份**: 每次备份前会清理旧的备份文件
- **独立备份脚本**: 可以单独运行备份操作
- **错误处理**: 完善的错误处理和日志输出

## 使用方法

### 1. 自动备份（推荐）

运行生成器时，备份会自动执行：

```bash
npm run generate
```

或者

```bash
pnpm generate
```

### 2. 手动备份

如果只想执行备份操作而不生成新文件：

```bash
npm run backup
```

或者

```bash
pnpm backup
```

### 3. 直接运行脚本

```bash
npx ts-node ./src/backup-script
```

## 文件结构

```
libraries/api/src/
├── generate/           # 当前生成的 API 文件
│   ├── admin.ts
│   ├── client.ts
│   └── public.ts
├── generate_backup/    # 备份的 API 文件
│   ├── admin.ts
│   ├── client.ts
│   └── public.ts
├── backup.ts          # 备份功能实现
├── backup-script.ts   # 独立备份脚本
└── generator.ts       # 生成器（已集成备份功能）
```

## 备份流程

1. **清理旧备份**: 删除 `generate_backup` 目录中的所有文件
2. **创建备份**: 将 `generate` 目录中的所有文件复制到 `generate_backup` 目录
3. **生成新文件**: 运行 API 生成器创建新的文件

## 注意事项

- 备份操作会在生成新文件之前自动执行
- 每次备份都会覆盖之前的备份文件
- 如果 `generate` 目录不存在，备份操作会被跳过
- 备份过程中会输出详细的日志信息

## 错误处理

如果备份过程中出现错误：

1. 错误信息会输出到控制台
2. 生成过程会停止
3. 原始文件不会被删除

## 开发说明

备份功能的主要文件：

- `backup.ts`: 核心备份功能实现
- `backup-script.ts`: 独立的备份脚本
- `generator.ts`: 已集成备份功能的生成器

备份功能使用 Node.js 的 `fs` 模块进行文件操作，确保跨平台兼容性。 
