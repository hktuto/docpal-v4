export default defineAppConfig({
    menu: {
        "client-case-manage": {
            id: 'client-case-manage',
            name: 'client-case-manage',
            icon: 'dp-icon:case-outline',
            hoverIcon: 'dp-icon:case-fill',
            label: "adminMenu.caseManagement",
            component: "LazyCasePage",
            props: {
                idOrPath: "/",
                filter: {}
            }
        },
    }
})