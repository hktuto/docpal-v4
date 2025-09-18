// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    'contact-book': {
      id: 'contact-book',
      name: 'contact-book',
      label: 'adminMenu.contactBook',
      icon: 'material-symbols-light:table-edit-rounded',
      hoverIcon: 'material-symbols-light:table-edit-rounded',
      component: 'LazyContactBook',
      props: {}
    }
  }
})
