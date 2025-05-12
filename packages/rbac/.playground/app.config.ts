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
      label: "User Base Role",
      icon: "lucide:file-text",
      children: [
        {
          name: "RBAC-editor"
        },
        {
          name: "user-role-file-action",
        },
        {
          name: "user-role-file-role",
        },
      ] 
    },
    {
      label: "File Base Role",
      name: "file-role-user",
      icon: "lucide:file-text",
      children: [
        {
          name: "file-role-user",
        }
      ]
    }
  ],
});
