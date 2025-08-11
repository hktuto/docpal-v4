# SQL Store Package

A modern document management system built with SQLite WASM, OPFS (Origin Private File System), and Element Plus UI components.

## 🚀 Features

### Modern UI/UX Design
- **Element Plus Integration**: Beautiful, responsive UI components
- **Gradient Backgrounds**: Modern visual design with gradient backgrounds
- **Card-based Layout**: Clean, organized interface using cards
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Elements**: Hover effects, animations, and smooth transitions

### Database Management
- **SQLite WASM**: Client-side database engine
- **OPFS Storage**: Persistent storage using Origin Private File System
- **Real-time Operations**: Live database operations with performance metrics
- **Batch Processing**: Efficient bulk document insertion
- **Transaction Support**: ACID-compliant database operations

### File Management
- **File Browser**: Hierarchical file and folder navigation
- **Breadcrumb Navigation**: Easy path traversal
- **File Type Icons**: Visual file type identification
- **Size Formatting**: Human-readable file sizes
- **MIME Type Support**: Comprehensive file type handling

### Search Capabilities
- **Full-Text Search**: Advanced search with FTS (Full-Text Search)
- **Search History**: Recent searches with quick access
- **Highlighted Results**: Search term highlighting in results
- **Real-time Search**: Instant search feedback
- **Search Tips**: Helpful search guidance

## 🛠️ Technology Stack

- **Frontend**: Vue 3 + Nuxt 3
- **UI Framework**: Element Plus
- **Database**: SQLite WASM
- **Storage**: OPFS (Origin Private File System)
- **Styling**: CSS3 with modern features
- **Icons**: Element Plus Icons

## 📁 Project Structure

```
packages/sql-store/
├── app.vue                 # Main app component with layout
├── components/
│   └── AppLayout.vue       # Global layout component
├── pages/
│   ├── index.vue          # Dashboard page
│   ├── setup.vue          # Database management
│   ├── browse.vue         # File browser
│   └── search.vue         # Search interface
├── assets/
│   └── css/
│       └── global.css     # Global styles
├── src/
│   ├── bridge.ts          # SQLite bridge
│   ├── queries.ts         # SQL queries
│   ├── schema.ts          # Database schema
│   └── utils.ts           # Utility functions
├── workers/
│   └── sqlite.worker.ts   # Web Worker for SQLite
└── nuxt.config.ts         # Nuxt configuration
```

## 🎨 Design Features

### Visual Design
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Glass Morphism**: Translucent cards with backdrop blur
- **Modern Typography**: Clean, readable fonts
- **Consistent Spacing**: Well-defined spacing system
- **Color Scheme**: Professional blue-based color palette

### Interactive Elements
- **Hover Effects**: Subtle animations on interactive elements
- **Loading States**: Visual feedback during operations
- **Success/Error Messages**: Toast notifications
- **Confirmation Dialogs**: Safe operation confirmations
- **Progress Indicators**: Operation progress visualization

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Flexible Layouts**: Adaptive grid systems
- **Touch-Friendly**: Large touch targets
- **Collapsible Navigation**: Responsive menu system

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- Bun (recommended) or npm
- Modern browser with OPFS support

### Installation

1. Navigate to the package directory:
```bash
cd packages/sql-store
```

2. Install dependencies:
```bash
bun install
```

3. Start development server:
```bash
bun run dev
```

4. Open your browser to `http://localhost:3020`

### Build for Production

```bash
bun run build
bun run preview
```

## 📱 Pages Overview

### Dashboard (`/`)
- Database status overview
- Quick action buttons
- System information
- Performance metrics

### Database Management (`/setup`)
- Batch document insertion
- Database cleanup
- Performance statistics
- Database configuration info

### File Browser (`/browse`)
- Hierarchical file navigation
- File type icons and metadata
- Breadcrumb navigation
- File size formatting

### Search (`/search`)
- Full-text search interface
- Search history
- Highlighted results
- Search tips and guidance

## 🎯 Key Components

### AppLayout.vue
Global layout component providing:
- Consistent navigation header
- Responsive menu system
- Footer with system information
- Sticky header with blur effects

### Database Operations
- **Batch Insert**: Efficient bulk document creation
- **Clean Database**: Safe database cleanup with confirmation
- **Performance Metrics**: Real-time operation timing
- **Error Handling**: Comprehensive error management

### File Management
- **Tree Navigation**: Hierarchical file structure
- **File Metadata**: Size, type, author information
- **Visual Indicators**: Icons for different file types
- **Path Management**: Breadcrumb navigation

### Search Interface
- **Search Input**: Large, prominent search field
- **History Management**: Recent searches with quick access
- **Result Highlighting**: Visual search term highlighting
- **Result Formatting**: Clean, organized result display

## 🔧 Configuration

### Nuxt Configuration
The package includes optimized Nuxt configuration:
- Element Plus module integration
- Security headers for cross-origin isolation
- WASM file handling
- Development tools enabled

### Element Plus Customization
Global CSS includes customizations for:
- Card shadows and hover effects
- Button styling and animations
- Table appearance
- Form element styling
- Custom scrollbars

## 🎨 Customization

### Styling
- Modify `assets/css/global.css` for global styles
- Page-specific styles in individual `.vue` files
- Element Plus theme customization available

### Layout
- Update `components/AppLayout.vue` for layout changes
- Modify navigation menu in the layout component
- Customize header and footer content

### Functionality
- Extend database operations in `src/` directory
- Add new pages in `pages/` directory
- Modify SQL queries in `src/queries.ts`

## 🔒 Security Features

- **Cross-Origin Isolation**: Required for OPFS access
- **Content Security Policy**: Secure resource loading
- **Origin Private File System**: Isolated storage
- **Input Validation**: Safe user input handling

## 📊 Performance

- **Web Worker**: Non-blocking database operations
- **WAL Mode**: Better concurrency and performance
- **Batch Operations**: Efficient bulk processing
- **Lazy Loading**: Optimized component loading

## 🤝 Contributing

1. Follow the existing code style
2. Use Element Plus components for consistency
3. Maintain responsive design principles
4. Add appropriate error handling
5. Update documentation for new features

## 📄 License

This package is part of the DocPal project and follows the project's licensing terms.

## 🆘 Support

For issues and questions:
1. Check the browser console for errors
2. Ensure OPFS support in your browser
3. Verify cross-origin isolation headers
4. Check SQLite WASM compatibility

---

**Built with ❤️ using Element Plus and SQLite WASM**



