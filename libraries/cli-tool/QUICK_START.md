# Quick Start Guide

Get the DocPal CLI Tool running in minutes!

## Prerequisites

- Node.js 18+ installed
- pnpm installed
- Git repository cloned

## Installation

### Option 1: Quick Install (Recommended)

**macOS/Linux:**
```bash
cd packages/cli-tool
./install.sh
```

**Windows:**
```cmd
cd packages\cli-tool
install.bat
```

### Option 2: Manual Install

```bash
cd packages/cli-tool
pnpm install
pnpm build
pnpm link --global
```

## Test the Installation

```bash
# Check if it's working
docpal --version

# Show help
docpal --help
```

## Your First Package

```bash
# Generate a new package
docpal package my-awesome-feature

# Follow the prompts or use -y to skip
docpal package my-awesome-feature -y
```

## Your First Page

```bash
# Generate a new page
docpal page admin-panel

# With description
docpal page admin-panel -d "Administrative panel interface"
```

## What Gets Created

The CLI tool will create:

1. **Directory Structure**: Based on `example-package/`
2. **package.json**: Customized with your details
3. **nuxt.config.ts**: Updated for your package/page
4. **Basic Components**: Ready to customize
5. **TypeScript Config**: Properly configured

## Next Steps

1. Navigate to your new package/page
2. Install dependencies: `pnpm install`
3. Start developing!
4. Customize the generated files

## Troubleshooting

**"Command not found" after installation:**
```bash
# Try refreshing your shell
source ~/.bashrc  # or ~/.zshrc
# Or restart your terminal
```

**Permission denied on install.sh:**
```bash
chmod +x packages/cli-tool/install.sh
```

**Build errors:**
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Need Help?

- Run `docpal --help` for command options
- Check the main README.md for detailed documentation
- Look at the generated files to understand the structure
