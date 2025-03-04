export const routeNotificationPage  = function(params: any){
  return {
    id: "notification-page",
    name: "notification-page",
    icon: 'ic:sharp-notifications-none',
    label: 'notifications.text',
    component: 'LazyNotificationPage',
    props: {
    }
  } as TabItem
}

