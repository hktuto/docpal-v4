import { defineAppConfig } from '#imports'
import type { MenuItem } from './utils/menuType'

export default defineAppConfig({
    menu:[
        {
            id: 'browse',
            icon: 'dp-icon:browse-outline',
            hoverIcon: 'dp-icon:browse-fill',
            label: "Browse",
            component: "LazyBrowse",
            children: [
                {
                    id: 'recent',
                    icon: 'lucide:clock',
                    label: "Recent",
                    component: "LazyBrowse",
                },
                {
                    id: 'star',
                    icon: 'lucide:star',
                    label: "Star",
                    component: "LazyBrowse",
                },
                {
                    id: 'collection',
                    icon: 'lucide:collection',
                    label: "Collection",
                    component: "LazyBrowse",
                },
                {
                    id: 'trash',
                    icon: 'lucide:trash',
                    label: "Trash",
                    component: "LazyBrowse",
                }
            ]
        },
        {
            id: 'search',
            icon: 'lucide:search',
            label: "Search",
            component: "LazyBrowse",
        },
        {
            id: 'collection',
            icon: "material-symbols:collections-bookmark-outline-rounded",
            label: "Collection",
            component: "LazyBrowse",
        },
        {
            id: 'workflow',
            icon: 'lucide:workflow',
            label: "workflow",
            component: "LazyBrowse",
        },
        {
            id: 'dashboard',
            icon: 'lucide:chart-pie',
            label: "Dashobard",
            component: "LazyBrowse",
            children: [
                {
                    id: 'dashboard-1',
                    icon: 'lucide:chart-pie',
                    label: "Dashboard 1",
                    component: "LazyBrowse",
                },
                {
                    id: 'dashboard-2',
                    icon: 'lucide:chart-pie',
                    label: "Dashboard 2",
                    component: "LazyBrowse",
                },
            ]
        }
    ] as MenuItem[]
})