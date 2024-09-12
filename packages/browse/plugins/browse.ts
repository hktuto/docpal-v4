import { useMenuList, resolveComponent, defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(nuxtApp => {
    const menuList = useMenuList()
    const item = {
        id: 'browse',
        key: 'browse',
        defaultRoute: 'browse',
        component: () => resolveComponent('LazyBrowsePage'),
        order: 0,
        pageLayout: 'browse',
        icon: '/icons/browser.svg',
        children: []
    }

    menuList.value.push(item);
})