import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:'workflow-editor',
      label: "Workflow Editor",
      icon: "dp-icon:flow-outline",
      hoverIcon: "dp-icon:flow-fill",
      component: "LazyWorkflowEditorList",
      props:{},
      children:[
        {
          id:'workflow-editor-list-inline',
          label: "List",
          icon: "dp-icon:flow-outline",
          hoverIcon: "dp-icon:flow-fill",
          component: "LazyWorkflowEditorMenuList",
          isList: true,
          props:{
            getListFunction: adminApi.workflowProcessDefinitionController.postPage,
            listResultMappingFunction: (data:any) => {
              return data.entryList.map((item:any) => {
                return {
                  name: item.name,
                  id: item.id,
                  tabData: {
                    id: item.id,
                    label: item.name,
                    icon: 'dp-icon:flow-outline',
                    component: 'LazyWorkflowEditorDetail',
                    props: {
                      id: item.id,
                      currentVersion: item.latestVersion,
                      productionVersion: item.productionVersion,
                      name: item.name,
                      item,
                    }
                  },
                  previewData:{
                    id:item.id,
                    label: item.name,
                    icon: 'dp-icon:flow-outline',
                    component: 'lazyWorkflowEditorViewer',
                    props:{
                      id: item.id,
                      latestVersion: item.latestVersion,
                      productionVersion: item.productionVersion,
                      name: item.name,
                      item
                    }
                  }
                }
              }) 
            },
            generatePreviewData:(item:any) => {
              return item
            },
            generatePageData:(item:any) => {
              return item.tabData
            },
          },
        }
      ]
    },
  ] ,

})