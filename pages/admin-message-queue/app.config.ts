import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu:{
    "admin-message-queue":{
        id:"admin-message-queue",
        name: 'admin-message-queue',
        label: "adminMenu.message_queue",
        icon: "material-symbols-light:display-settings-rounded",
        hoverIcon: "material-symbols-light:display-settings-rounded",
        component: "LazyMessageQueuePage",        
        props:{},
    }
  }

})