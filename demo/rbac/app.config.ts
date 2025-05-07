export default defineAppConfig({

  menu:{
    "RBAC":{
      id:"RBAC",
      name: 'rgac',
      label: "ROLE-Editor",
      icon: "lucide:file-cog",
      hoverIcon: "lucide:file-cog",
      component: "LazyRbacPage",
      feature: "CORE",
    }
  }
});
