import { defineAppConfig } from '#imports'
export default defineAppConfig({
    menu: {
        'client-holdPolicies': {
            id:'client-holdPolicies',
            name : 'client-holdPolicies',
            label: "client_holdPolicies",
            icon: 'ic:outline-lock-clock',
            hoverIcon : 'ic:outline-lock-clock',
            component: "LazyHoldPage",
            props:{}
        },
        'client-retention': {
            id:'client-retention',
            name : 'client-retention',
            label: "client_retention",
            icon: 'iconoir:privacy-policy',
            hoverIcon : 'iconoir:privacy-policy',
            component: "LazyRetentionPage",
            props:{}
        }
    }
})
