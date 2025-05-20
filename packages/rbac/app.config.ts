export default defineAppConfig({

  menu:{
    "RBAC-editor":{
      id:"RBAC-editor",
      name: 'rgac',
      label: "ROLE-Editor",
      icon: "lucide:file-cog",
      hoverIcon: "lucide:file-cog",
      component: "LazyRbacPage",
      feature: "CORE",
    },
    "user-role-file-action": {
      id: "user-role-file-action",
      name: "user-role-file-action",
      label: "File Permission - actions",
      icon: "lucide:file-text",
      hoverIcon: "lucide:file-text",
      component: "LazyUserRoleFileAction",
      feature: "CORE",
    },
    // "user-role-file-role": {
    //   id: "user-role-file-role",
    //   name: "user-role-file-role",
    //   label: "File Permission - users",
    //   icon: "lucide:file-text",
    //   hoverIcon: "lucide:file-text",
    //   component: "LazyUserRoleFileRole",
    //   feature: "CORE",
    // },
    // "file-role-user": {
    //   id: "file-role-user",
    //   name: "file-role-user",
    //   label: "File Role User",
    //   icon: "lucide:file-text",
    //   hoverIcon: "lucide:file-text",
    //   component: "LazyFileRoleUser",
    //   feature: "CORE",
    // }
  }
});
