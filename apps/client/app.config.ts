export default defineAppConfig({
  // appMenu:[
  //     {
  //         name:'client-browse'
  //     },
  //     {
  //         name:'client-search'
  //     },
  //     {
  //         name:'client-master-table'
  //     },
  //     {
  //         name:'client-folder-cabinet'
  //     }
  // ],
  appMenu: [
    {
      name: "client-work-panel"
    },
    {
      name: "client-browse"
    },
    {
      name: "client-search"
    },
    {
      label: "file_uploads",
      icon: "uil:upload",
      children: [
        {
          name: "client-ai-upload"
        },
        {
          name: "client-fileRequest"
        }
      ]
    },
    {
      label: "file_share_module",
      icon: "meteor-icons:share",
      children: [
        {
          name: "client-share"
        },
        {
          name: "client-share-me"
        },
        {
          name: "client-share-other"
        }
      ]
    },
    {
      name: "client-collections"
    },
    // {
    //     name: "client-smartFolder"
    // },
    {
      name: "client-folder-cabinet"
    },
    {
      name: "client-workflow"
    },
    {
      label: "retention_policies",
      icon: "ic:outline-lock-clock",
      children: [
        {
          name: "client-retention"
        },
        {
          name: "client-holdPolicies"
        }
      ]
    },
    {
      name: "client-dashboard"
    },
    {
      name: "client-master-table"
    },
    {
      name: "client-trash"
    },
    {
      name: "client-case-manage"
    },
    {
      name: "client-easy-form"
    },
    {
      name :"user-role-file-action"
    },
    {
      name: "RBAC-client-page"
    }
  ],
  adminMenu:[
    {
      name: '',
      icon: 'tabler:align-box-right-bottom',
      hoverIcon: 'tabler:align-box-right-bottom-filled',
      label: 'User Management',
      children: [
        {
          name: 'admin-user'
        },
        {
          name: 'admin-group'
        },
        {
          name: 'RBAC-editor'
        },
        {
          name: 'RBAC-page'
        },
        {
          name: 'admin-profile-setting'
        },
        {
          name: 'admin-setting'
        },
        
      ]
    },
    {
      label: 'adminMenu.shareModule',
      icon: 'lucide:share-2',
      hoverIcon: 'lucide:share-2',
      children: [
        {
          name: 'admin-internal-share'
        },
        {
          name: 'admin-external-share'
        }
        // {
        //     name: 'admin-share-list'
        // }
      ]
    },
    {
      label: 'adminMenu.browse',
      icon: 'ri:folder-5-line',
      hoverIcon: 'ri:folder-5-line',
      children: [
        {
          name: 'admin-smart-folder'
        },
        {
          name: 'admin-document-type'
        },
        {
          name: 'admin-metadata-list'
        },
        {
          name: 'admin-folder-cabinet'
        },
        {
          name: 'admin-dam'
        }
      ]
    },
    {
      name: 'admin-watermark'
    },
    {
      label: 'adminMenu.workflow',
      icon: 'dp-icon:flow-outline',
      children: [
        {
          name: 'admin-workflow-manage'
        },
        {
          name: 'admin-workflow-retry'
        },
        {
          name: 'admin-workflow-editor'
        }
        // {
        //     name: "super-workflow-form"
        // }
      ]
    },
    {
      label: 'adminMenu.dashboardManagement',
      icon: 'carbon:dashboard',
      children: [
        {
          name: 'admin-dashboard'
        },
        {
          name: 'admin-work-panel'
        }
      ]
    },
    {
      label: 'adminMenu.templateManagement',
      icon: 'lucide:layout-template',
      children: [
        {
          name: 'admin-document-template'
        },
        {
          name: 'admin-email-template'
        },
        {
          name: 'admin-message-template'
        }
      ]
    },
    {
      label: 'adminMenu.policy',
      icon: 'lucide:book-lock',
      children: [
        {
          name: 'admin-hold-policies'
        },
        {
          name: 'admin-retention-policies'
        }
      ]
    },
    {
      name: 'admin-master-table'
    },
    {
      label: 'adminMenu.log',
      icon: 'dp-icon:log',
      children: [
        {
          name: 'admin-log-manage'
        },
        {
          name: 'admin-audit'
        },
        {
          name: 'admin-message-queue'
        },
        {
          name: 'admin-mail-config'
        }
      ]
    },
    {
      label: 'adminMenu.system',
      icon: 'lucide:server',
      children: [
        {
          name: 'admin-acl'
        },
        {
          name: 'admin-external-connection'
        },
        {
          name: 'admin-password-policy'
        },
        
      ]
    },
    {
      name: 'admin-case-management'
    },
    {
      name: 'admin-unique-id-generator'
    },
    {
      name: 'admin-company-profile'
    },
    {
      name: 'admin-external-storage'
    },
    {
      name: 'admin-bulk-import'
    },
    {
      name: 'admin-import-jobs'
    },
    
    {
      name: 'admin-azure'
    },
   
    {
      name: 'admin-easy-form'
    },
    {
      name: 'admin-calendar-setting'
    },
    
    // {
    //   name: 'admin-doc-template-collaboration'
    // },
   
    
  ]
});
