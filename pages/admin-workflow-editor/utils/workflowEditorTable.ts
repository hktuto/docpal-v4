export const workflowEditorListTableSetting = {
    columns: [
        { id: '2', label: 'table_name', prop: 'name', defaultColumn: true },
        { id: '6', label: 'workflow_createDate', prop: 'createdDate',
            formatList: [
                {
                    "joiner": "",
                    "prop": "createdDate",
                    "formatFun": "dateFormat",
                    "params": {
                        "format": ""
                    },
                    "index": 0
                }
            ]  
        },
        { id: '3', label: 'dpTable_status', prop: 'publishStatus', slot: 'publishStatus', width: 120 },
        { id: '8', type: "", label: "dpTable_actions", slot: 'dpTable_actions', width: 80 }
    ],
    events: ['delete'],
    slots: [
    ],
    options: { pageSize: 20 }
}