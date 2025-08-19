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
      name: "client-browse"
    },
    {
      name: "client-search"
    },
    {
      label: "file_uploads",
      icon: "hugeicons:cloud-upload",
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
      icon: "lucide:file-symlink",
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
      label: "adminMenu.dashboardManagement",
      icon: "material-symbols:dashboard-customize-outline-rounded",
      children: [
        {
          name: "client-work-panel"
        },
        {
          name: "client-dashboard"
        }
      ]
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
        }
      ]
    },
    {
      name: 'admin-bulk-import'
    },
    {
      label: 'adminMenu.shareModule',
      icon: 'lucide:file-symlink',
      hoverIcon: 'lucide:file-symlink',
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
      icon: 'lucide:file-pen',
      hoverIcon: 'lucide:file-symlink',
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
      icon: 'material-symbols:dashboard-customize-outline-rounded',
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
      icon: 'lucide:logs',
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
        {
          name: 'admin-setting'
        },
        {
          name: 'admin-profile-setting'
        }
      ]
    },
    {
      name: 'admin-azure'
    },
    {
      name: 'admin-case-management'
    },
    {
      name: 'admin-easy-form'
    },
    {
      name: 'admin-calendar-setting'
    },
    {
      name: 'admin-unique-id-generator'
    },
    // {
    //   name: 'admin-doc-template-collaboration'
    // },
    {
      name: 'admin-company-profile'
    },
    {
      name: 'admin-external-storage'
    },
    {
      name: 'admin-import-jobs'
    }
  ]
});
