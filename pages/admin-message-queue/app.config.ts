import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:[
    {
      id:"admin-message-queue",
      name: 'admin-message-queue',
      label: "adminMenu.message_queue",
      icon: "material-symbols-light:display-settings-rounded",
      hoverIcon: "material-symbols-light:display-settings-rounded",
      component: "LazyMessageQueuePage",
      props:{},
    },
    // {
    //   id:"admin-retention-policies",
    //   name: 'admin-retention-policies',
    //   label: "adminMenu.retention",
    //   icon: "streamline:interface-lock-shield-combination-combo-lock-locked-padlock-secure-security-shield-keyhole",
    //   hoverIcon: "streamline:interface-lock-shield-combination-combo-lock-locked-padlock-secure-security-shield-keyhole",
    //   component: "LazyRetentionPage",
    //   props:{},
    // }
  ] ,

})