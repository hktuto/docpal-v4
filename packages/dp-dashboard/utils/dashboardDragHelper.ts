import type { DashboardWidgetSetting } from './dashboardWidgetHelper'
import { getWidgetSetting } from './dashboardWidgetHelper'

/**
 * 初始化拖拽功能
 */
export function useDashboardDrag(options: {
  wrapper: Ref<HTMLElement | undefined>
  layout: Ref<DashboardWidgetSetting[]>
  colNum: number
  rowHeight: number
  onAdd?: (item: DashboardWidgetSetting) => void
}) {
  const { wrapper, layout, colNum, rowHeight, onAdd } = options

  // 存储拖拽数据
  const dragData = ref<{
    component: string
    label: string
    icon?: string
  } | null>(null)

  // 存储占位符数据
  const placeholder = ref<{
    x: number
    y: number
    w: number
    h: number
    show: boolean
  }>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    show: false
  })

  /**
   * 处理widget开始拖拽
   */
  function handleDragStart(event: DragEvent, item: any) {
    if (!event.dataTransfer) return

    dragData.value = {
      component: item.component,
      label: item.label,
      icon: item.icon
    }

    event.dataTransfer.effectAllowed = 'copy'
    event.dataTransfer.setData('text/plain', JSON.stringify(dragData.value))
  }

  /**
   * 处理拖拽进入容器
   */
  function handleDragOver(event: DragEvent) {
    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy'
    }

    // 如果有拖拽数据，显示占位符
    if (dragData.value) {
      const component = dragData.value.component
      const widgetSetting = getWidgetSetting(component as any)
      
      if (widgetSetting) {
        const position = calculateDropPosition(event)
        
        placeholder.value = {
          x: position.x,
          y: position.y,
          w: widgetSetting.w,
          h: widgetSetting.h,
          show: true
        }
      }
    }
  }

  /**
   * 计算拖拽位置
   */
  function calculateDropPosition(event: DragEvent) {
    if (!wrapper.value) return { x: 0, y: 0 }

    const rect = wrapper.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left + wrapper.value.scrollLeft
    const mouseY = event.clientY - rect.top + wrapper.value.scrollTop

    // 计算grid位置 (考虑margin)
    const margin = 12
    const colWidth = (wrapper.value.offsetWidth - margin * (colNum + 1)) / colNum
    const effectiveRowHeight = rowHeight + margin

    let x = Math.floor(mouseX / (colWidth + margin))
    let y = Math.floor(mouseY / effectiveRowHeight)

    // 确保x在有效范围内
    x = Math.max(0, Math.min(x, colNum - 1))
    y = Math.max(0, y)

    return { x, y }
  }

  /**
   * 处理放置
   */
  function handleDrop(event: DragEvent) {
    event.preventDefault()

    if (!dragData.value) return

    try {
      const component = dragData.value.component
      const widgetSetting = getWidgetSetting(component as any)

      if (!widgetSetting) {
        console.error('Widget setting not found:', component)
        return
      }

      const position = calculateDropPosition(event)

      // 创建新的widget item
      const newItem: DashboardWidgetSetting = {
        x: position.x,
        y: position.y,
        i: new Date().valueOf().toString(),
        ...widgetSetting
      }

      // 添加到layout
      layout.value.push(newItem)

      // 触发回调
      if (onAdd) {
        onAdd(newItem)
      }
    } catch (error) {
      console.error('Drop error:', error)
    } finally {
      dragData.value = null
      placeholder.value.show = false
    }
  }

  /**
   * 处理拖拽离开
   */
  function handleDragLeave(event: DragEvent) {
    // 检查是否真的离开了容器
    if (!event.relatedTarget || !(event.relatedTarget as HTMLElement).closest) {
      placeholder.value.show = false
    }
  }

  /**
   * 处理拖拽结束
   */
  function handleDragEnd(event: DragEvent) {
    dragData.value = null
    placeholder.value.show = false
  }

  return {
    dragData,
    placeholder,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    handleDragEnd
  }
}

