interface DamProvider {
    getListApi: (params:any) => Promise<any>,
    handleDialog: (row:any) => void
    handleDelete: (row:any) => void
}

export const DamProviderKey: InjectionKey<DamProvider> = Symbol('DamProviderKey')


export function mergeDataByKey(arr:any, key:any) {
    const map:any = {}
    const result:any[] = []
    arr.forEach((item:any) => {
        if(item.operation) item.operation = JSON.parse(item.operation)
        if(map[item[key]]) {
            map[item[key]].list.push({ ...item })
        } else {
            map[item[key]] = { [key]: item[key], list: [{ ...item }]}
            result.push(map[item[key]])
        }
    })
    return result
}