import { defineAppConfig } from '#imports'
export default defineAppConfig({
    menu: {
        'client-holdPolicies': {
            id:'client-holdPolicies',
            name : 'client-holdPolicies',
            label: "client_holdPolicies",
            icon: 'dp-icon:hold',
            hoverIcon : 'dp-icon:hold',
            component: "LazyHoldPage",
            feature: "HOLD_POLICIES",
            props:{}
        },
        'client-retention': {
            id:'client-retention',
            name : 'client-retention',
            label: "client_retention",
            icon: 'dp-icon:retention',
            hoverIcon : 'dp-icon:retention',
            component: "LazyRetentionPage",
            feature: "RETENTION_POLICIES",
            props:{}
        }
    }
})
