export const routeContactList = function(params: any){
  return {
    id: "contact-list-" + new Date().getTime(),
    name: "contact-list-" + params.id,
    icon: 'ph:address-book-light',
    label: params.name,
    component: 'LazyContactList',
    props: {
      id: params.id,
      name: params.name
    }
  } as TabItem
}
