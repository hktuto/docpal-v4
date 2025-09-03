# DocPal CLI Tool

A cross-platform CLI tool for generating new packages and pages in the DocPal monorepo.

## Features

- 🚀 Generate new packages in `packages/` directory
- 📄 Generate new pages in `pages/` directory
- 🔧 Interactive prompts for customization
- 📦 Based on the `example-package` template
- 🖥️ Cross-platform support (Windows, macOS, Linux)
- ✅ Input validation and error handling

## Installation

### Prerequisites

- Node.js 18+ installed
- pnpm or npm installed
- Git repository cloned

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
npm link
```

### Option 3: Global Installation

```bash
cd packages/cli-tool
pnpm install
pnpm build
npm link --global
```

## Usage

### Global Usage (After Installation)

```bash
# Check if it's working
docpal --version

# Show help
docpal --help
```

### Local Usage

```bash
# From the cli-tool directory
node dist/index.js --help

# Or build and run
pnpm build && node dist/index.js
```

## Commands

### Generate Command

```bash
# Generate with type and name
docpal generate -t package -n my-feature
docpal generate -t page -n admin-dashboard

# With description
docpal generate -t package -n my-feature -d "My awesome feature package"

# Skip prompts
docpal generate -t package -n my-feature -y
```

### Package Command

```bash
# Generate a new package
docpal package my-feature

# With description
docpal package my-feature -d "My awesome feature package"

# Skip prompts
docpal package my-feature -y
```

### Page Command

```bash
# Generate a new page
docpal page admin-dashboard

# With description
docpal page admin-dashboard -d "Admin dashboard page"

# Skip prompts
docpal page admin-dashboard -y
```

## Options

- `-t, --type <type>`: Type of generation (`package` or `page`)
- `-n, --name <name>`: Name of the package/page
- `-d, --description <description>`: Description of the package/page
- `-y, --yes`: Skip confirmation prompts
- `-h, --help`: Show help information
- `-V, --version`: Show version information

## Examples

### Generate a New Package

```bash
docpal package user-management -d "User management functionality"
```

This will:
1. Create `packages/user-management/`
2. Copy the example package structure
3. Customize `package.json` with your details
4. Set up basic directories (`components/`, `public/`, `src/`)

### Generate a New Page

```bash
docpal page client-dashboard -d "Client dashboard interface"
```

This will:
1. Create `pages/client-dashboard/`
2. Copy the example package structure
3. Customize `package.json` for the page
4. Create a basic Vue component
5. Set up basic directories

## Directory Structure

Generated packages/pages will have this structure:

```
packages/my-feature/
├── components/
│   └── global/
├── public/
│   └── icons/
├── src/
├── package.json
├── nuxt.config.ts
└── tsconfig.json
```

## Template Customization

The CLI tool uses the `example-package/` directory as a template. To customize the generated output:

1. Modify the template files in `example-package/`
2. Update the generators in `src/generators/`
3. Rebuild the CLI tool

## Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Watch mode for development
pnpm dev

# Test the CLI tool
node dist/index.js --help
```

## Cross-Platform Support

The CLI tool is designed to work on:
- **Windows**: Uses proper path separators and handles Windows-specific chalk configuration
- **macOS**: Full support with Unix-style paths
- **Linux**: Full support with Unix-style paths

## Error Handling

The tool includes comprehensive error handling:
- Validates package/page names
- Checks for existing directories
- Provides clear error messages
- Cleans up on failure
- Graceful fallbacks for cross-platform compatibility

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

**ES Module issues:**
The tool uses ES modules. Make sure your Node.js version supports them (18+).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License
