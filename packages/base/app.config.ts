import { defineAppConfig } from '#imports'
// import type { MenuItem } from '#imports'

export default defineAppConfig({
    menu:[
        {
            id: 'search',
            icon: 'lucide:search',
            label: "Search",
            component: "LazyTabEmpty",
        },
        {
            id: 'collection',
            icon: "material-symbols:collections-bookmark-outline-rounded",
            label: "Collection",
            component: "LazyTabEmpty",
        },
        {
            id: 'workflow',
            icon: 'lucide:workflow',
            label: "workflow",
            component: "LazyTabEmpty",
        },
        {
            id: 'dashboard',
            icon: 'lucide:chart-pie',
            label: "Dashobard",
            component: "LazyTabEmpty",
            children: [
                {
                    id: 'dashboard-1',
                    icon: 'lucide:chart-pie',
                    label: "Dashboard 1",
                    component: "LazyTabEmpty",
                },
                {
                    id: 'dashboard-2',
                    icon: 'lucide:chart-pie',
                    label: "Dashboard 2",
                    component: "LazyTabEmpty",
                },
            ]
        }
    ] 
})