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
      label: "adminMenu.dashboard",
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
      name: "RBAC-page"
    }
  ]
});
