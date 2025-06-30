// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    'client-user-setting': {
      id: 'client-user-setting',
      name: 'client-user-setting',
      label: 'admin.setting.title',
      icon: 'lucide:user',
      component: 'LazyUserSetting',
      feature: 'USER_SETTING',
      props: {}
    }
  }
})