export function notiShowView(row) {
  const isCancel = row.operate === 'TRASH' ||
    row.operate === 'DELETE' ||
    row.operate === 'CANCELD' ||
    (row.type === 'Upload-Request' && !row.content.processInstanceId)
  const showView = row.content.documentId ||
    row.content.uploadId ||
    row.content.processInstanceId
  return !isCancel && showView
}
export async function notiHandleView(row: any, tabProvider: any) {
  
  // const router = useRouter()
  if (row.content.processInstanceId) {
    if(row.type === 'Upload-Request') {
      // router.push(`/fileRequest/${row.content.processInstanceId}`)
      const newItem = createUploadRequestDetailParams({
        taskId: row.content.processInstanceId,
      })
      tabProvider?.openTab(newItem, true)
    } else {
      const router = useRouter()
      router.push(`/workflow/link?processInstanceId=${row.content.processInstanceId}`) 
    }
  } 
  else if(row.content.documentId) {
    const newItem = createBrowseListPageParams({
      idOrPath: row.content.documentId,
      commentId: row.content.commentId
    })
    tabProvider?.openTab(newItem, true)
  }
  else if (row.content.uploadId) {
    const status = row.content.notiStatus === 'FAIL' ? 'Error' : 'Ready'
    // router.push(`/AIUpload/${row.content.uploadId}?status=${status}`)
    const newItem = createAiUploadDetail({
      id: row.content.uploadId,
      status
    })
    tabProvider?.openTab(newItem, true)
    
  }
}

