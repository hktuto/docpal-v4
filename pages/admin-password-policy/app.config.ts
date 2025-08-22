import { adminApi } from '../../libraries/api/src/index'
// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    'admin-password-policy': {
      id: 'admin-password-policy',
      name: 'admin-password-policy',
      label: 'adminMenu.passwordPolicy',
      icon: 'dp-icon:key',
      hoverIcon: 'dp-icon:key',
      component: 'LazyPasswordPolicyPage',
      props: {}
    }
  }
})
