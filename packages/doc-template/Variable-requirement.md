# Variable Development Requirements

to extend the doc-template to other su-system in DocPal, we need to develop a variable system.

DocPal aleady have a global data-types system, in packages/dp-datatype. we should build on top of it. to make sure the variable system is compatible with the data-types system.

## Analysis of Requirements

### 1. Compatibility with Data-Types System
- The variable system must integrate with the existing data-types system in `packages/dp-datatype`.\n- This ensures type safety, reusability, and consistency across DocPal.\n

### 2. Usability in Doc-Template
- Variables must be easily inserted and managed within the doc-template editor.\n- The editor should provide UI tools for inserting different variable types (Text, List, Table, Links, Image).\n

### 3. Variable Tools
- **Insert Text/List/Table/Links/Image:**  \n  The editor must support inserting variables of these types, each with appropriate UI and rendering logic.\n

### 4. CRUD Operations
- **Create:**  \n  - Users can create new variables in the editor.\n  - System must check for name uniqueness before creation.\n- **Edit:**  \n  - Users can edit variables.\n  - If a variable is in use (referenced in the template), editing should be restricted or require confirmation.\n- **Delete:**  \n  - Users can delete variables.\n  - If a variable is in use, deletion should be restricted or require confirmation.\n

### 5. Display Value
- Each variable should have a display value for visual representation in the editor (e.g., a placeholder or preview).\n

## Development Plan

### A. Data Model & Types
1. **Extend Data-Types System:**\n   - Define a `Variable` type that extends or references the data-types system.\n   - Fields: `id`, `name`, `type`, `displayValue`, `value`, `inUse`, `createdBy`, `createdAt`, etc.\n

2. **Variable Registry/Store:**\n   - Centralized store ( do not use pinia or vuex since we are using nuxt, and DocPal is a tab style application, that means there can be multiple instances of the doc-template, so we need to use a store that is not tied to a single instance ) for managing variables within the doc-template context.\n

### B. Editor Integration
1. **UI Components:**\n   - **Variable List Panel:**  \n     - Shows all variables, their types, and display values.\n     - Allows CRUD operations.\n   - **Insert Variable Tool:**  \n     - Toolbar or context menu for inserting variables into the template.\n     - Modal/dialog for creating/editing variables.\n   - **Variable Placeholder/Preview:**  \n     - Render variables in the editor with their display value and type icon.\n

2. **Accessibility:**\n   - Ensure all variable UI elements are accessible (tabindex, aria-label, keyboard navigation).\n

### C. CRUD Logic
1. **Create Variable:**\n   - Modal/form for variable creation.\n   - Validate name uniqueness (case-insensitive).\n   - Select type (Text, List, Table, etc.) and configure value.\n   - Set display value.\n

2. **Edit Variable:**\n   - Only allow editing if not in use, or prompt user if in use.\n   - Update value, display value, or type.\n

3. **Delete Variable:**\n   - Only allow deletion if not in use, or prompt user if in use.\n

4. **Check Usage:**\n   - Track variable usage in the template (e.g., via references in the document model).\n

### D. Data Persistence
- Store variables in the doc-template's data model (local state, backend, or both).\n- Sync changes with backend if needed.\n

### E. Validation & Error Handling
- Show clear error messages for duplicate names, invalid types, or restricted actions.\n- Use tooltips (`v-tooltip`) for guidance and error explanations.\n

### F. Testing
- Unit tests for:\n  - Variable creation, editing, deletion logic.\n  - Name uniqueness validation.\n  - Usage checks.\n- Mock exposed functions and props as per your repo rules.\n

### G. Documentation
- Document the variable system API, usage in the editor, and integration points with the data-types system.\n

## Variable Value Structure & UI by Type

| Type   | Value Structure | UI/Setting Needed |
|--------|----------------|------------------|
| text   | string         | Text input       |
| list   | { items: Array<{ label: string, value: string }> } | List editor (add/remove/edit items) |
| table  | { columns: string[], rows: Array<Array<string>> } | Table editor (add/remove columns/rows, edit cells) |
| link   | { label: string, url: string } | Input for label and URL |
| image  | { url: string, alt: string } | Image URL input, Alt Text input |

### Example TypeScript type for variable value

```ts
type VariableValue =
  | string // text
  | { items: Array<{ label: string; value: string }> } // list
  | { columns: string[]; rows: Array<Array<string>> } // table
  | { label: string; url: string } // link
  | { url: string; alt: string } // image
```

### UI/Setting Tool for Each Type

- **Text:** Simple `<el-input>` for value.
- **List:** Dynamic list editor (add/remove/edit label-value pairs).
- **Table:** Table editor (add/remove columns/rows, edit cell values).
- **Link:** Two inputs: label and URL.
- **Image:** Image URL input, Alt Text input.

### Implementation Notes
- The variable form should show a different value editor based on the selected type.
- Use a dynamic component or conditional rendering for the value field.
- Validation should match the structure for each type.

## Suggested File/Folder Structure

```
packages/doc-template   
    components/
      docTemplate/
        content/
          toolbar/
            variable/
              text.vue // this is the component for inserting text variable.
              list.vue // this is the component for inserting list variable.
              table.vue // this is the component for inserting table variable.
              link.vue // this is the component for inserting link variable.
              image.vue // this is the component for inserting image variable.
          setting/
            variable/
              manager.vue // this is the main component for variable manager.
              newVariable.vue // this is the component for creating new variable.
              variableForm.vue // this is the component for editing variable.
              
```

## Next Steps

1. **Design the Variable Type and Store.**\n2. **Implement UI Components for Variable Management.**\n3. **Integrate CRUD logic and usage checks.**\n4. **Connect with the data-types system.**\n5. **Write unit tests and documentation.**\n

