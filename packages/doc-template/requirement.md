## Document Template variable system

### Variable type

```
{
  type: "Text" | "Paragraph" | "documentId" | "CaseId" | "WorkflowId" | "Email" | "Website" | "Table",
  key: string,
  displayValue: any,
}
```
### FYI
- ui library: element-plus
- editor library: tiptap

### Requirement

1. add variable manager in docTemplate editor header toolbar ( via useDocHeader)
  - click to open variable manager
    - show varible list as table, and have a button to add / edit / delete variable
  - add new variable form
    - should check if the variable key is already exist
  - edit variable form
    - only variable display value can be edited
2. add variable text to editor
  - create variable text node in /libraries/docpal-document-editor/src/packages/
    - node should be able to prompt the variable list and let user select the variable, by user input "{{".
    - display node should be able to display variable key in top let corner as a small text, and display value as content.
    - display node should have a edit icon, and prompt the variable list when user click the edit icon.
  - since variable text node use vue as node render , it not good for server to render html, please also create a server side variable text node.
    - it should be render the variable display value as content.
  - add variable text node to editor
    - add variable text node extension to /libraries/docpal-document-editor/src/client/index.ts
  - add inert variable text node to editor toolbar
    - create a new button in editor toolbar, and prompy the variable list when user click the button.
    - after user select the variable, it should insert the variable text node to the editor.
