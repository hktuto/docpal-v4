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
export async function notiHandleView(item) {
  const router = useRouter()
  if (item.content.processInstanceId) {
    if(item.type === 'Upload-Request') {
      router.push(`/fileRequest/${item.content.processInstanceId}`)
    } else {
      router.push(`/workflow/link?processInstanceId=${item.content.processInstanceId}`) 
    }
  } 
  else if(item.content.documentId) {
    // openFileDetail(item.content.documentId,{
    //   showInfo:true,
    //   showHeaderAction:true
    // })
    // router.push(`/browse?docId=19b04954-6f20-4a1c-a64f-45747e732994&commentId=8848e6aa-53f4-41f4-bd85-57611a6bb5e5`)
    if (item.content.commentId) {
      router.push(`/browse?docId=${item.content.documentId}&commentId=${item.content.commentId}`)
    }
    else router.push(`/browse?docId=${item.content.documentId}`)
  }
  else if (item.content.uploadId) {
    const status = item.content.notiStatus === 'FAIL' ? 'Error' : 'Ready'
    router.push(`/AIUpload/${item.content.uploadId}?status=${status}`)
  }
}

