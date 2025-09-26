// create nuxt app config
import { defineAppConfig } from '#imports'

export default defineAppConfig({
  menu: {
    'contact-book': {
      id: 'contact-book',
      name: 'contact-book',
      label: 'adminMenu.contactBook',
      icon: 'ph:address-book-light',
      hoverIcon: 'ph:address-book-light',
      component: 'LazyContactBook',
      props: {}
    }
  }
})
