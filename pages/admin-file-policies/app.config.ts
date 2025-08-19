import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-hold-policies":{
      id:"admin-hold-policies",
      name: 'admin-hold-policies',
      label: "adminMenu.holdPoliciesManage",
      icon: "dp-icon:hold",
      hoverIcon: "dp-icon:hold",
      component: "LazyAdminHoldPage",
      feature: "HOLD_POLICIES",
      props:{},
    },
    "admin-retention-policies":{
      id:"admin-retention-policies",
      name: 'admin-retention-policies',
      label: "adminMenu.retention",
      icon: "dp-icon:retention",
      hoverIcon: "dp-icon:retention",
      component: "LazyAdminRetentionPage",
      feature: "RETENTION_POLICIES",
      props:{},
    }
  }

})
