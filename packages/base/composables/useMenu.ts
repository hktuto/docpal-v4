import type {MenuItem} from '../utils/menuType'

export const useMenuList = () => useState<MenuItem[]>('app-menu', () =>([
    {
        id:'browse',
        icon: 'lucide:folder',
        label: "Browse",
        component:"LazyBrowse",
        draggable: true,
    },
    {
        id:'search',
        icon: 'lucide:search',
        label: "Search",
        component:"LazyBrowse",
        draggable: false
    },
    {
        id:'collection',
        icon:"material-symbols:collections-bookmark-outline-rounded",
        label: "Collection",
        component:"LazyBrowse",
        draggable: false,
    },
    {
        id:'workflow',
        icon: 'lucide:workflow',
        label:"workflow",
        component:"LazyBrowse",
        draggable:true
    },
    {
        id:'dashboard',
        icon: 'lucide:chart-pie',
        label:"Dashobard",
        component:"LazyBrowse",
        draggable:true
    },
]))
export const menuKey = Symbol('menu');
export const useMenuDrop =() => {

    function isMenuData(data:any) {
        return data[menuKey] === true
    }

    function getMenuData(data:MenuItem) {
        return {
            [menuKey]:true, menuId: data.id, data
        }
    }
    return {
        menuKey,
        getMenuData,
        isMenuData
    }
}