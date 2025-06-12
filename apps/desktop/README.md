# DocPal Desktop Application

A desktop application built with Electron that serves as a client for the DocPal platform.

## Features

- PDF document viewing and management
- Integration with DocPal services
- Customizable user preferences
- Cross-platform support (Windows, macOS, Linux)

## Development

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm package manager

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Build the application:
```bash
pnpm run build
```

3. Start the application in development mode:
```bash
pnpm run start
```

### Available Scripts

- `pnpm run build` - Compile TypeScript files
- `pnpm run watch` - Watch for changes and recompile
- `pnpm run lint` - Run ESLint
- `pnpm run start` - Build and start the application
- `pnpm run pack` - Create an unpacked distribution
- `pnpm run dist` - Create a packaged distribution

## Application Structure

- `src/main.ts` - Main application entry point
- `src/pref.ts` - User preferences management
- `src/app.ts` - Main application client setup

## User Preferences

The application stores user preferences locally, including:
- PDF reader URL
- API endpoints
- Proxy configurations
- Service endpoints

Preferences can be reset through the application menu (Help > Reset).

## Building for Distribution

To create a distributable package:

```bash
pnpm run dist
```

This will create platform-specific installers in the `dist` directory.

## License

ISC 
