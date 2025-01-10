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
      component: "LazyHoldPage",
      props:{},
    },
    "admin-retention-policies":{
      id:"admin-retention-policies",
      name: 'admin-retention-policies',
      label: "adminMenu.retention",
      icon: "streamline:interface-lock-shield-combination-combo-lock-locked-padlock-secure-security-shield-keyhole",
      hoverIcon: "streamline:interface-lock-shield-combination-combo-lock-locked-padlock-secure-security-shield-keyhole",
      component: "LazyRetentionPage",
      props:{},
    }
  }

})