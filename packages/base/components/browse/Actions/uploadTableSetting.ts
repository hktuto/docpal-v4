export default {
    columns: [
        { id: '1', type: 'selection' },
        { id: '2', type: 'expand', slot: 'expand' },
        { id: '3', label: 'dpDocument_fileName', prop: 'initName', sortable: true, defaultColumn: true },
        { id: '4', label: 'dpDocument_fileType', prop: 'type', slot: 'documentType', sortable: true },
        {   
            id: '5',
            "type": "",
            "label": "dpTable_actions",
            class: "slotTopRight",
            "prop": "",
            "align": "center",
            "width": 100,
            "hide": false,
            "system": false,
            "showOverflowTooltip": false,
            "formatList": [],
            "buttons": [
                {
                    "name": "",
                    "type": "text",
                    "command": "delete",
                    "suffixIcon": "/icons/menu/trash.svg",
                    "index": 0
                }
            ],
            "prefixIcon": "",
            "suffixIcon": "",
        }
    ],
    events: [],
    options: { },
}
