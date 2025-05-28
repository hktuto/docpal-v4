import type { InjectionKey } from "vue";
import type { TipTapOptions } from "docpal-document-editor";

export type DocOptions = {
  docOptions: DocumentOptions,
}

export type DocumentOptions = {
  pageSize?: { // Defaults to U.S. letter portrait orientation.
    width: number, // width of the page for all pages in this section in TWIP. Defaults to 12240 Maximum 31680.
    height: number, // height of the page for all pages in this section in TWIP. Defaults to 15808 Maximum 31680.
  },
  pageOrientation?: 'portrait' | 'landscape', // Defaults to U.S. letter portrait orientation.
  pageMargins?: { // Defaults to U.S. letter portrait orientation.
    top: number, // top margin in TWIP. Defaults to 100 Maximum 31680.
    bottom: number, // bottom margin in TWIP. Defaults to 100 Maximum 31680.
    left: number, // left margin in TWIP. Defaults to 100 Maximum 31680.
    right: number, // right margin in TWIP. Defaults to 100 Maximum 31680.
    header: number, // header margin in TWIP. Defaults to 100 Maximum 31680.
    footer: number, // footer margin in TWIP. Defaults to 100 Maximum 31680.
    gutter: number, // gutter margin in TWIP. Defaults to 100 Maximum 31680.
  },
  title ?: string, // title of the document,
  subject ?: string, // subject of the document,
  creator ?: string, // creator of the document,
  keywords ?: string[], // keywords of the document,
  description ?: string, // description of the document,
  lastModifiedBy ?: string, // last modifier of the document,
  revision ?: string, // revision of the document,
  createdAt ?: string, // created date of the document,
  modifiedAt ?: string, // modified date of the document,
  headerType  ?: 'default' | 'first' | 'even', // header type of the document,
  header?: boolean,
  footer?: boolean,
  pageNumber ?: boolean, // flag to enable page number in footer. Defaults to false. Page number works only if footer flag is set as true.
  footerType?: 'default' | 'first' | 'even',
  font?: string // font name to be used. Defaults to Times New Roman.
  fontSize?: number, 
  lang ?: string 
}

export type ToolSection = {
  name : string,
  tools: DocTool[],
  requiredOptions?: string[]
}

export type DocTool = {
  name: string,
  components: any ,
  requiredOptions?: string[]
}

export type VariableType = 'Text' | 'Paragraph' | 'documentId' | 'CaseId' | 'WorkflowId' | 'Email' | 'Website' | 'List' | 'Table'

export interface TableColumn {
  header: string
  key: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableRow {
  [key: string]: string | number | boolean
}

export interface VariableItem {
  type: VariableType
  key: string
  displayValue: string | string[] | TableRow[]
  tableColumns?: TableColumn[] // Only for Table type
  listStyle?: 'bullet' | 'numbered' | 'none' // Only for List type
}

export const variableType = [
  {
    type: 'Text' as const,
  },
  {
    type: 'Paragraph' as const,
  },
  {
    type: 'documentId' as const,
  },
   {
    type: "CaseId" as const,
  },
  {
    type: "WorkflowId" as const,
  },
  {
    type: "Email" as const,
  },
    {
    type: "Website" as const,
  },
  {
    type: "List" as const,
  },
  {
    type : "Table" as const,
  }
]

export type LastSelection = {
  type: "text" | "textRange" | "image" | "cell",
  data: any
}

interface DocTemplateProvider {
  editor: Ref<any>,
  options: Ref<TipTapOptions, TipTapOptions>,
  initEditor: (options:TipTapOptions) => void,
  lastSelection: Ref<LastSelection | null | undefined>,
  variables : Ref<VariableItem[]>,
  addVariable: (variable: VariableItem) => void,
  removeVariable: (updateVariable: VariableItem) => void,
  updateVariable?: (variable: VariableItem) => void
}

export const DocTemplateProveKey: InjectionKey<DocTemplateProvider> = Symbol('DocTemplateProvide')
