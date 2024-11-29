
export const tableSetting:ListSetting = {
    api:{
        url: "",
        method: "get",
        params: {},
        data: {}
    },
    columns:[
        {
            key: 'name',
            name: 'name',
            dataType : 'string',
            sortable: true,
            filterable: false,
        }
    ],
    actions:[
        {
            code: 'edit_latest_version',
            name: 'Edit Latest Version',
            function: ({row, rowIndex}:any) => {
                netvigatTo('/admin-workflow-editor/detail?id=' + row.id)
            }
        }
    ]
}