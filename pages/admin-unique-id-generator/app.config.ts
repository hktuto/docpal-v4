// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    'admin-unique-id-generator': {
      id: 'admin-unique-id-generator',
      name: 'unique-id-generator',
      label: 'adminMenu.uniqueIdGenerator',
      icon: 'dp-icon:flow-outline',
      hoverIcon: 'dp-icon:flow-fill',
      component: 'LazyUniqueIdGeneratorPage',
      props: {}
    }
  }
})