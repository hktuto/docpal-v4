export const getNotificationUnreadCountListApi = async() => {
  console.log("api mock success")
  return [
    { "unreadCount": 0, "type": "Document-Acl" },
    { "unreadCount": 1, "type": "Ai-analysis" },
    { "unreadCount": 0, "type": "Workflow" },
    { "unreadCount": 0, "type": "Document-Share" },
    { "unreadCount": 11, "type": "Document" },
    { "unreadCount": 0, "type": "Upload-Request" }
  ]
}
export const notiReadAllApi = async() => {
  console.log("api mock success")
  return true
}
export const notiDissmissByTypeApi = async() => {
  console.log("api mock success")
  return true
}