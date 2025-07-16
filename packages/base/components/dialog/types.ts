/**
 * Dialog 组件的 Props 接口
 */
export interface DialogProps {
  /** 对话框显示状态 */
  modelValue?: boolean
  /** 对话框标题 */
  title?: string
  /** 对话框宽度 */
  width?: string | number
  /** 是否全屏显示 */
  fullscreen?: boolean
  /** 对话框距离顶部的距离 */
  top?: string
  /** 是否显示遮罩层 */
  modal?: boolean
  modalClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  /** 是否插入到 body 元素 */
  appendToBody?: boolean
  appendTo?: HTMLElement
  /** 是否锁定页面滚动 */
  lockScroll?: boolean
  openDelay?: number
  closeDelay?: number
  /** 点击遮罩层是否关闭 */
  closeOnClickModal?: boolean
  /** 按 ESC 键是否关闭 */
  closeOnPressEscape?: boolean
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 关闭前的回调函数 */
  beforeClose?: (done: () => void) => void
  /** 是否可拖拽 */
  draggable?: boolean
  overflow?: boolean
  /** 是否居中显示 */
  center?: boolean
  alignCenter?: boolean
  /** 关闭时是否销毁子元素 */
  destroyOnClose?: boolean
  closeIcon?: string | Component
  zIndex?: number

  /** 允许传递其他 el-dialog 属性 */
  [key: string]: any
}

/**
 * Dialog 组件的 Emits 接口
 */
export interface DialogEmits {
  /** 对话框显示状态变化 */
  'update:modelValue': [value: boolean]
  /** 全屏状态变化 */
  'update:fullscreen': [value: boolean]
  /** 对话框打开时触发 */
  'open': []
  /** 对话框打开动画结束时触发 */
  'opened': []
  /** 对话框关闭时触发 */
  'close': []
  /** 对话框关闭动画结束时触发 */
  'closed': []
  'open-auto-focus': []
  'close-auto-focus': []
}
