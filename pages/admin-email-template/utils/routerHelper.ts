export const routeEmailTemplateDetail = function (params: any) {
  return {
    id: "admin-template-detail-versions-" + new Date().getTime(),
    name: "admin-template-detail-versions-" + params.id,
    icon: 'fluent:mail-template-16-regular',
    label: params.id,
    component: 'LazyEmailTemplateDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}

export const routeLayoutTemplatePage = function () {
  return {
    id: "admin-layout-template",
    name: "admin-layout-template",
    icon: 'fluent:mail-template-16-regular',
    label: "emailTemplate.layout",
    component: 'LazyLayoutTemplatePage',
    props: {
    }
  } as TabItem
}
