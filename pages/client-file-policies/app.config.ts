import { defineAppConfig } from '#imports'
export default defineAppConfig({
    menu: {
        'client-holdPolicies': {
            id:'client-holdPolicies',
            name : 'client-holdPolicies',
            label: "client_holdPolicies",
            icon: 'lucide:trash-2',
            hoverIcon : 'lucide:trash-2',
            component: "LazyHoldPage",
            props:{}
        },
        'client-retention': {
            id:'client-retention',
            name : 'client-retention',
            label: "client_retention",
            icon: 'lucide:trash-2',
            hoverIcon : 'lucide:trash-2',
            component: "LazyRetentionPage",
            props:{}
        }
    }
})
