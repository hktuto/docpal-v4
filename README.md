# DocPal v4.0

DocPal v4.0 is a modern document management system built with Vue.js and Nuxt.js, offering advanced document handling capabilities with a microservices architecture.

## 🚀 Features

- Document management and organization
- User authentication and authorization (Keycloak integration)
- Multi-language support (i18n)
- Dark/Light mode support
- Advanced search capabilities
- Document sharing and collaboration
- Workflow management
- Administrative controls

## 📁 Project Structure

```
docpal-v4/
├── apps/                    # Application frontends
│   ├── admin/              # Admin dashboard
│   └── client/             # Client web application
├── libraries/              # Shared libraries
│   ├── api/                # Swagger-generated API client
│   ├── eventbus/          # Event handling system
│   └── pdf-js/            # PDF handling utilities
├── packages/              # Core functionality packages
│   ├── base/              # Base components and utilities
│   ├── authApp/           # Authentication module
│   ├── dp-search/         # Search functionality
│   └── publicApp/         # Public-facing components
├── pages/                 # Pages ui for admin and client
```

## 🛠️ Technology Stack

- Vue.js 3
- Nuxt.js 3
- Element Plus UI
- Keycloak for authentication
- TypeScript
- Vitest for testing
- PNPM for package management

## 🚦 Getting Started

### Prerequisites

- Node.js (LTS version)
- PNPM 8.14.3 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd docpal-v4
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp env/.env.example env/.env
   ```

### Development

To start the development server:

```bash
pnpm dev
```

To run tests:

```bash
pnpm test
```

To build for production:

```bash
pnpm build
```


## 📚 Documentation

Additional documentation can be found in the following locations:
- API Documentation: `libraries/api/README.md`
- Component Library: `packages/base/README.md`
- Authentication: `packages/authApp/README.md`

## 🤝 Contributing

Please read our contributing guidelines before submitting pull requests.

## 📄 License

[License Information]
