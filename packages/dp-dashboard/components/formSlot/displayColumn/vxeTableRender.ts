import { VxeUI } from 'vxe-pc-ui'
// 创建一个单元格超链接
VxeUI.renderer.add('ClickActionCell', {
  // 默认显示模板
  renderTableDefault(renderOpts: any, renderParams: any) {
    const prefix = renderOpts.params.setting.prefix || ''
    const suffix = renderOpts.params.setting.suffix || ''
    return h(
      'a',
      {
        href: 'javascript:void(0)',
        onClick: () => {
          const content: any = {}
          switch (renderOpts.params.linkType) {
            case 'openCase':
              content.caseInstanceId =renderParams.row[renderParams.column.field]
              break
            case 'openWorkflow':
              content.processInstanceId = renderParams.row[renderParams.column.field]
              break
            case 'openDocument':
              content.documentId = renderParams.row[renderParams.column.field]
              break
          }
          notiHandleView({ content }, renderOpts.params.tabProvider)
          if (renderOpts.params.closeDialog) {
            renderOpts.params.closeDialog()
          }
        }
      },
      prefix + renderParams.row[renderParams.column.field] + suffix
    )
  }
})
