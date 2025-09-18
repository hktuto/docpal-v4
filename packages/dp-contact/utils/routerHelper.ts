export const routeContactList = function(params: any){
  return {
    id: "contact-list-" + new Date().getTime(),
    name: "contact-list-" + params.id,
    icon: 'meteor-icons:share',
    label: params.name,
    component: 'LazyContactList',
    props: {
      id: params.id,
      name: params.name
    }
  } as TabItem
}
