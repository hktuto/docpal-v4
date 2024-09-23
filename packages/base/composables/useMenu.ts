import type {MenuItem} from '../utils/menuType'

export const useMenuList = () => useState<MenuItem[]>('app-menu', () =>([
    {
        id:'browse',
        icon: 'lucide:folder',
        label: "Browse",
        component:"LazyBrowse",
        draggable: true,
        children:[
            {
                id:'recent',
                icon: 'lucide:clock',
                label: "Recent",
                component:"LazyBrowse",
                draggable: false
            },
            {
                id:'star',
                icon: 'lucide:star',
                label: "Star",
                component:"LazyBrowse",
                draggable: false    
            },
            {
                id: 'collection',
                icon: 'lucide:collection',
                label: "Collection",
                component:"LazyBrowse",
                draggable: false
            },
            {
                id: 'trash',
                icon: 'lucide:trash',
                label: "Trash",
                component:"LazyBrowse", 
            }
        ]
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
        draggable:true,
        children:[
            {
                id:'dashboard-1',
                icon: 'lucide:chart-pie',
                label:"Dashboard 1",
                component:"LazyBrowse",
                draggable:false
            },
            {
                id:'dashboard-2',
                icon: 'lucide:chart-pie',
                label:"Dashboard 2",
                component:"LazyBrowse",
                draggable:false
            },
        ]
    },
]))
export const menuKey = Symbol('menu');
