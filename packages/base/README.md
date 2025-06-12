# @docpal/base

This package provides all non-auth-dependent base modules, components, composables, plugins, styles, and utilities for DocPal V4. It is designed to be shared across all DocPal applications.

---

## Features

- **i18n**: Internationalization support with language resources in `i18n/lang/`.
- **Element Plus UI**: Integrated and extended Element Plus components.
- **SCSS Styles**: Global and modular SCSS variables and styles.
- **Icon Set**: Nuxt Icon (Iconify) integration.
- **Base Components**: Reusable UI and utility components.
- **Composables**: Common Vue composables for state, DnD, tabs, language, and more.
- **Plugins**: Useful Vue/Nuxt plugins (tooltips, code diff, image viewer, etc.).
- **Utilities**: Helper functions and types for browsing, permissions, context menus, etc.

---

## Directory Structure

```
base/
├── assets/         # SCSS, JS, and style resources
├── components/     # Base Vue components (UI, forms, tabs, etc.)
├── composables/    # Vue composables (useDnD, useTab, useLanguage, etc.)
├── i18n/           # Language files and i18n setup
├── plugins/        # Nuxt/Vue plugins (v-tooltip, v-form, etc.)
├── public/         # Public assets
├── types/          # Shared TypeScript types
├── utils/          # Utility functions and helpers
├── package.json
└── README.md
```

---

## Usage

Install via workspace or as a dependency in your Nuxt 3/Vue 3 project.

### Register Plugins

Most plugins are auto-registered if you use this package in a Nuxt app. For manual registration or advanced usage, import from `plugins/`.

### Example: v-tooltip Directive

A simple, accessible tooltip directive for Vue 3/Nuxt 3.

```vue
<template>
  <button v-tooltip="'Tooltip text'">Hover or focus me</button>
  <span v-tooltip.html="'<b>Bold</b> tooltip'">HTML Tooltip</span>
</template>
```

- Use `v-tooltip="'text'"` for plain text.
- Use `v-tooltip.html="'<b>html</b>'"` for HTML content.

**Features:**
- Shows on mouseenter/focus, hides on mouseleave/blur.
- Supports plain text and HTML.
- Accessible: `aria-describedby`, `role="tooltip"`, keyboard support.
- Styles can be overridden via `.v-tooltip-global` in your SCSS.

---

## Components

- App wrapper
- InfoDiff
- CollapseMenu
- SVG icons
- Loading background
- And many more in `components/` (forms, tabs, tables, viewers, etc.)

---

## Composables

- `useDnD` – Drag and drop helpers
- `useTab` – Tab management
- `useLanguage` – Language/i18n helpers
- `useGlobalSetting`, `useQuickActions`, `useBrowse`, etc.

---

## useVxeTable

A powerful composable for building advanced, feature-rich tables using [vxe-table](https://x-extends.github.io/vxe-table/). Handles data loading, pagination, sorting, filtering, context menus, permissions, and more.

### Basic Usage

```vue
<script setup lang="ts">
import { useVxeTable } from '@docpal/base/composables/useVxeTable'

const {
  tableConfig,
  tableEvent,
  tableRef,
  cleanSelectedRows,
  reload,
  query
} = useVxeTable({
  id: 'my-table',
  columns: [
    { field: 'name', title: 'Name' },
    { field: 'age', title: 'Age' }
  ],
  api: async (params) => fetchData(params), // Your data API
  bodyActions: [
    [
      { name: 'Edit', action: ({ row }) => handleEdit(row) },
      { name: 'Delete', action: ({ row }) => handleDelete(row) }
    ]
  ],
  selectChangeHander: (selectedRows) => {
    // handle selection change
  }
})
</script>

<template>
  <vxe-grid v-bind="tableConfig" v-on="tableEvent" ref="tableRef" />
</template>
```

### Main Parameters
- `id` (**required**): Unique table ID (used for state/cache).
- `columns`: Table columns (see vxe-table docs).
- `api`: Data loading function (should return `{ result: [], page: { total } }`).
- `bodyActions`, `headerActions`, `footerActions`: Context menu actions.
- `selectChangeHander`: Callback for row selection changes.
- `permissionMethod`: Control menu item visibility/disabled state.
- `virtualScroll`, `pageSize`, `refresh`, `zoom`, etc.: Table features and options.

### Returns
- `tableConfig`: Reactive config for `<vxe-grid />`.
- `tableEvent`: Event handlers for `<vxe-grid />`.
- `tableRef`: Ref for the table instance.
- `cleanSelectedRows()`: Clear all selected rows.
- `reload()`: Reload table data.
- `query(params)`: Query table with custom params.

### Features
- Remote/local pagination, sorting, filtering
- Customizable context menus (header/body/footer)
- Permission-based menu/action control
- Persistent column order and page size (per user)
- Virtual scroll and lazy loading support
- Responsive/mobile optimizations

See the source for advanced options and full API.

---

## Utilities

- `browseHelper`, `browseProvider`, `browseDragDropHelper`
- `permissionHelper`, `contextMenuHelper`
- `globalHelper`, `tryCatch`, `date`, etc.
- Type definitions for tabs, menus, tables, and more

---

## Styles

- Global SCSS: `assets/styles/main.scss`, `assets/styles/var.scss`
- Utility SCSS: `assets/styles/flex.scss`, `assets/styles/elements/`
- Override or extend as needed in your app

---

## i18n

- Language files in `i18n/lang/` (default, custom, meta, ui)
- Easily extend or override for your app

---

## Plugins

- `v-tooltip` – Tooltip directive
- `v-form` – Form plugin
- `codeDiff`, `imgViewer`, `vueTagInput`, etc.
- Element Plus and Nuxt Icon integration

---

## Development

- Run `pnpm install` to install dependencies.
- Use `pnpm dev` to start the playground for local development.
- Build with `pnpm build`.

---

## License

ISC

---

## v-tooltip Directive

A simple, accessible tooltip directive for Vue 3/Nuxt 3. Provides a global tooltip on hover or focus for any element.

**Location:** `packages/base/plugins/v-tooltip.client.ts`

### Usage

Register the plugin in your Nuxt app (already auto-registered if using this package):

```vue
<template>
  <button v-tooltip="'Tooltip text'">Hover or focus me</button>
  <span v-tooltip.html="'<b>Bold</b> tooltip'">HTML Tooltip</span>
</template>
```

- Use `v-tooltip="'text'"` for plain text.
- Use `v-tooltip.html="'<b>html</b>'"` for HTML content.

### Features
- Shows tooltip on mouseenter and focus, hides on mouseleave and blur.
- Supports both plain text and HTML tooltips.
- Tooltip is appended to `body` and positioned below the element.
- Accessible: sets `aria-describedby` and `role="tooltip"`.

### Accessibility
- Tooltip is accessible via keyboard (focusable elements).
- Adds `aria-describedby` to the target element when tooltip is shown.
- Tooltip element uses `role="tooltip"` and `tabindex="-1"`.

### Styling
- Tooltip styles are injected globally by the directive. You can override `.v-tooltip-global` in your global SCSS for custom appearance.

---


 