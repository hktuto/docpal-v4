import { adminApi } from './../../libraries/api/src/index';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    "admin-import-jobs":{
      id:"admin-import-jobs",
      name: 'admin-import-jobs',
      label: "adminMenu.importJobs",
      icon: "material-symbols-light:table-edit-rounded",
      hoverIcon: "material-symbols-light:table-edit-rounded",
      component: "LazyImportJobsPage",
      props:{},
    }
  } ,

})
