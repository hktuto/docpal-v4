// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    'admin-unique-id-generator': {
      id: 'admin-unique-id-generator',
      name: 'unique-id-generator',
      label: 'adminMenu.uniqueIdGenerator',
      icon: 'icon-park-outline:writing-fluently',
      hoverIcon: 'icon-park-outline:writing-fluently',
      component: 'LazyUniqueIdGeneratorPage',
      props: {}
    }
  }
})
