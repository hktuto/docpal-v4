const documentWorkflow = {
  'adHocApproval': (row: any, tabProvider: any) => {
    openDocHelper(row, tabProvider, { showInfo: true })
  },
  'holdApproval': (row: any, tabProvider: any) => {
    openDocHelper(row, tabProvider)
  }
}
type DocumentWorkflowKey = keyof typeof documentWorkflow
export function needDocHelper(row: any, tabProvider: any): boolean {
  let result = false
  Object.keys(documentWorkflow).forEach((key: string) => {
    if(row.content.notificationType?.includes(key as DocumentWorkflowKey)) {
      documentWorkflow[key as DocumentWorkflowKey](row, tabProvider)
      result = true
    }
  })
  return result
}

export function openDocHelper(row: any, tabProvider: any, initData: any = {}) {
  const params: any = { idOrPath: row.content.documentId, ...initData }
  if (row.content.commentId) {
    params.commentId = row.content.commentId
  }

  const newItem = createBrowseListPageParams({
    ...params
  })
  tabProvider?.openTab(newItem, true)
}
