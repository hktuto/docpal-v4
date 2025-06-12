# @doc-template

**DocPal Doc Template Module**  
A modular, Nuxt 3-based document template editor for the DocPal platform, built with Vue 3 and TipTap. This package provides a rich, extensible document editing experience, including collaborative features, variable management, and export/import capabilities.

---

## Features

- **Rich Document Editing**: Built on [TipTap](https://tiptap.dev/) and [docpal-document-editor](https://github.com/your-org/docpal-document-editor).
- **Collaboration**: Real-time editing with Yjs and Hocuspocus.
- **Variable Management**: Insert, edit, and manage document variables.
- **Custom Toolbars**: Modular toolbars for font, paragraph, table, and more.
- **Import/Export**: Support for docx, HTML, and JSON.
- **Nuxt 3 & Vue 3**: Modern, composable architecture.
- **SCSS Styling**: Theming and custom styles via SCSS.

---

## Directory Structure

```
packages/doc-template/
├── components/
│   └── docTemplate/
│       ├── editor.vue           # Main editor component
│       ├── viewer.vue           # Read-only viewer
│       ├── header/              # Header (toolbar tabs)
│       ├── footer/              # Footer
│       ├── newDocument/         # New document dialog & form
│       └── content/
│           ├── setting/         # Page, import/export, undo, etc.
│           └── toolbar/
│               ├── font/
│               ├── fontStyle/
│               ├── paragraph/
│               ├── table/
│               ├── auxiliary/
│               └── variable/
├── utils/
│   └── docTemplateHelper.ts     # Types, helpers, and validation
├── public/
│   └── icons/                   # SVG and other assets
├── package.json
├── nuxt.config.ts
├── vitest.config.mts
└── tsconfig.json
```

---

## Usage

### Install dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test
```

---

## Main Components

- **`<DocTemplateEditor />`**: The main WYSIWYG editor.
- **`<DocTemplateHeader />`**: Toolbar with tabs for Home, Table, Data, Setting.
- **`<DocTemplateFooter />`**: Footer actions and info.
- **`<DocTemplateViewer />`**: Read-only document viewer.

### Toolbars

- **Font**: Font family, size, color, etc.
- **Paragraph**: Alignment, spacing, etc.
- **Table**: Table insertion and editing.
- **Variable**: Insert and manage variables.
- **Auxiliary**: Additional tools (undo/redo, etc.).
- **Setting**: Page settings, import/export.

---

## Utilities

- **`docTemplateHelper.ts`**:  
  - Types: `DocTemplateVariable`, `ToolSection`, etc.
  - Functions: `validateVariable`, etc.

---

## Dependencies

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [TipTap](https://tiptap.dev/)
- [Yjs](https://yjs.dev/)
- [Hocuspocus](https://hocuspocus.dev/)
- [Element Plus](https://element-plus.org/)
- [docpal-document-editor](https://github.com/your-org/docpal-document-editor)

---

## Contributing

- Follow the monorepo structure and code style.
- Use SCSS for all styles.
- Place unit tests next to the component files.
- Use composables and helpers from the `utils/` directory.

---

## License

ISC

---

Let me know if you want to add usage examples, API details, or any other section!
