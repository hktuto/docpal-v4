export interface FormDesigner {
  setFormJson: (json: FormJson) => void
  getFormJson: () => FormJson
  clearDesigner: () => void;
  refreshDesigner: () => void; 
}
export interface FormRenderer {
  setFormJson: (json: FormJson) => void
  getFormJson: () => FormJson
  clearDesigner: () => void
  refreshDesigner: () => void
  setFormData: (data: FormData) => void
  getFormData: (needValidation?: boolean) => Promise<FormData>
  getWidgetRef: (name: string) => any
  widgetRefList: Record<string, any>
}
export interface FormVariablesRenderer extends FormRenderer {
  vFormRenderRef: FormRenderer
}
export type FormJson = {
  widgetList: WidgetItem[]
  formConfig: FormConfig
}
export type FormConfig = {
  modelName?: string
  refName?: string
  rulesName?: string
  labelWidth?: number
  labelPosition?: string
  size?: string
  labelAlign?: string
  cssCode?: string
  customClass?: string[]
  functions?: string
  layoutType?: string
  jsonVersion?: number
  onFormCreated?: string
  onFormMounted?: string
  onFormDataChange?: string
  onFormValidate?: string
  saveRemoteOptions?: string
  labelFormUniqueName?: boolean
  dataSources?: any[]
  languageMenu?: boolean //是否显示语言切换菜单
  externalLink?: boolean //是否显示GitHub、文档等外部链接
  formTemplates?: boolean //是否显示表单模板
  eventCollapse?: boolean //是否显示组件事件属性折叠面板
  widgetNameReadonly?: boolean //禁止修改组件名称
  clearDesignerButton?: boolean //是否显示清空设计器按钮
  previewFormButton?: boolean //是否显示预览表单按钮
  importJsonButton?: boolean //是否显示导入JSON按钮
  exportJsonButton?: boolean //是否显示导出JSON器按钮
  exportCodeButton?: boolean //是否显示导出代码按钮
  generateSFCButton?: boolean //是否显示生成SFC按钮
  toolbarMaxWidth?: number //设计器工具按钮栏最大宽度（单位像素）
  toolbarMinWidth?: number //设计器工具按钮栏最小宽度（单位像素）
  presetCssCode?: string //设计器预设CSS样式代码
  resetFormJson?: boolean //是否在设计器初始化时将表单内容重置为空
}

export type WidgetItem = {
  key: string
  id: string
  type: string
  formItemFlag?: boolean
  options: WidgetOptions
}
export type WidgetOptions = {
  name: string
  label: string
  required: boolean
  defaultValue?: string
  size?: string
  columnWidth?: string
  placeholder?: string
  readonly?: boolean
  disabled?: boolean
  hidden?: boolean
  clearable?: boolean
  requiredHint?: string
  onValidate?: string
  onCreated?: string
  onMounted?: string
  onInput?: string
  onChange?: string
  onFocus?: string
  onBlur?: string
  onEnter?: string
}
export type FormData = Record<string, any>

export type FieldListApiType = {
  nameKey?: string
  labelKey?: string
  data: any[]
}

