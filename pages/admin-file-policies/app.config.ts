import { adminApi } from 'api';
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-hold-policies":{
      id:"admin-hold-policies",
      name: 'admin-hold-policies',
      label: "adminMenu.holdPoliciesManage",
      icon: "ic:outline-lock-clock",
      hoverIcon: "ic:outline-lock-clock",
      component: "LazyAdminHoldPage",
      feature: "HOLD_POLICIES",
      props:{},
    },
    "admin-retention-policies":{
      id:"admin-retention-policies",
      name: 'admin-retention-policies',
      label: "adminMenu.retention",
      icon: "iconoir:privacy-policy",
      hoverIcon: "iconoir:privacy-policy",
      component: "LazyAdminRetentionPage",
      feature: "RETENTION_POLICIES",
      props:{},
    }
  }

})
