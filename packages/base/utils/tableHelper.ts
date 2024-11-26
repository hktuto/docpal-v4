export const createTableConfig = (id:string, api:any, columns:any[]) => {

    return {
        id,
        border: true,
        toolbarConfig: {
            custom: true
        },
        customConfig: {
            storage: false,
            // restoreStore ({ id }) {
            //     return getColumnSetting(id)
            // },
            // updateStore ({ id, storeData }) {
            //     // 模拟异步，实现服务端保存
            //     return setColumnSetting(id, storeData)
            // }
        },
        columns,
        pagerConfig: {},
        proxyConfig: {
            ajax: {
              query: async({ page }:any) => {
                // 默认接收 Promise<{ result: [], page: { total: 100 } }>
                const {data} = await api({pageSize:page.pageSize, pageNum:page.currentPage - 1})
                return {
                    result: data.entryList,
                    page: {
                        total: data.totalSize
                    }
                }
              }
            }
        },
    }
}

function getColumnSetting(columnId:string) {

}

function setColumnSetting(id:string, storeData:any) {

}