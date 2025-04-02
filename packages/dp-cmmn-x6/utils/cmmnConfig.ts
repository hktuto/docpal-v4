type CmmnExtentionProperties = 'docpal:form' | 
    'docpal:attributes ' |
    'flowable:in' |
    'flowable:out'
type criteriaCalc = 'notEmpty' | 'equal' | 'getOrDefault'
type criteria = {
    properties: string,
    calc: criteriaCalc,
    value: string
} 
const nodeChildMap = {
    'docpal:form': 'field',
}
/**
 * 添加 Properties
 */
export const CmmnDefaultProperties = {
    'field': {
        id: '',
        name: '', // 必须
        type: '',
    },
    'flowable:in': {
        id: '',
        source: '',
        target: ''
    },
    'flowable:out': {
        id: '',
        source: '',
        target: ''
    },
    'criteria': {
        properties: '',
        calc: 'notEmpty'
    }
}
/**
 * 仅支持 extensionElements中prop为数组的情况
 * @param element extensionElements 父级元素
 * @param prop extensionElements 属性
 * @param data 
 * @returns 
 */
let id = 1

export function updateExtentionProperties(element: any, prop: CmmnExtentionProperties = 'docpal:form', data: any, caseId: string) {
    if(!element.extensionElements) element.extensionElements = {}
    console.log("updateExtentionProperties", data)
    if(!Array.isArray(data)) {
        return updateCmmnObject(element.extensionElements, prop, data, caseId)
    }
    return updateCmmnProperties(element.extensionElements, prop, data, caseId)
}
export function updateCmmnObject(element: any, prop: CmmnExtentionProperties = 'docpal:form', data: any, caseId: string) {
    const _data = Object.keys(data).reduce((prev, key) => {
        prev[`attr_${key}`] = data[key]
        return prev
    }, {})
    
    element[prop] = [{
        attr_id: `${prop}_${new Date().valueOf().toString()}`.replace(':', '_'),
        attr_name: `${prop}_${new Date().valueOf().toString()}`.replace(':', '_'),
        attr_casetable: caseId,
        ..._data
    }]
    return element[prop]
}

export function updateCmmnProperties(element: any, prop: CmmnExtentionProperties = 'docpal:form', data: any, caseId: string) {
    let fieldName = nodeChildMap[prop]
    if(!element[prop]) element[prop] = [{
        attr_id: `${prop}_${new Date().valueOf().toString()}`.replace(':', '_'),
        attr_name: `${prop}_${new Date().valueOf().toString()}`.replace(':', '_'),
        attr_casetable: caseId
    }]
    if(!fieldName) { // flowable:in,flowable:out
        element[prop] = conversion(data)
        addId(element[prop], prop)
        return element[prop]
    } else {
        element[prop] = [{
            ...element[prop][0],
            attr_casetable: caseId,
            [fieldName]: conversion(data)
        }]
        addId(element[prop][0], prop)
        return element[prop]
    }
    function conversion(list: any) {
        return list.map(item => {
            return Object.keys(item).reduce((prev: any, key: string) => {
                if(item[key] instanceof Array){
                    prev[key] = conversion(item[key])
                } else if(key === '__cdata'){
                    prev[key] = getAttr(key, item)
                } else{
                    prev[`attr_${key}`] = getAttr(key, item)
                } 
                return prev
            }, {})
        })
    }
    function getAttr (key, item) {
        if(key === 'id' && item.id) return item.id
        else if(key === 'id' && !item.id && item.name) return item.name.replace(/ /g,'_')
        else if(key === 'id' && !item.id) {
            id ++ 
            return  new Date().valueOf().toString() + id
        }
        else return item[key]
    }
    function addId(element, prop) {
        const date = new Date().valueOf().toString() 
        if(!element['attr_id']) element['attr_id'] = (date + '_' + prop).replace(':', '_')
        if(!element['attr_name']) element['attr_name'] =(date + '_' + prop).replace(':', '_')
        if(!element['attr_casetable']) element['attr_casetable'] = caseId
    }
}
export function getExtentionProperties(element: any, prop: CmmnExtentionProperties  = 'docpal:form') {
    try {
        let fieldName = nodeChildMap[prop]
        // console.log(element.extensionElements);
        // console.log(element.extensionElements[prop]);
        // console.log(element.extensionElements[prop][fieldName], 'fieldName', fieldName);
        
        let field = element.extensionElements[prop]
        if(!Array.isArray(field) && field) field = [field]
        const result = revert(field)
        if (fieldName) { // 如果存在子级
            const _result = result.reduce((prev, item) => {
                item[fieldName].forEach(fItem => {
                    prev.push(fItem)
                })
                return prev
            }, [])
            return _result
        }
        return result
    } catch (error) {
        return []
    }
    function revert(list: any) {
        return list.map(item => {
            return Object.keys(item).reduce((prev: any, key: string) => {
                if(item[key] instanceof Array) prev[key] = revert(item[key])
                else {
                    const _key = key.replace('attr_','')
                    prev[_key] = getAttr(key, item)
                }
                return prev
            }, {})
        })
    }
    function getAttr (key, item) {
        if(key === 'attr_id' && !item['attr_id']) {
            id ++ 
            return  new Date().valueOf().toString() + id
        }
        else return item[key]
    }
}

export function getCriterias(nodeDate: any) {
    const result: any = []
    try {
        const cData = nodeDate.sentry.data.ifPart.condition.__cdata.replace(/ /g, '')
        const regex0 = /(?<=\{)(.+?)(?=\})/g // 获取${}内
        const regexNotEmpty = /(?<=(var:isNotEmpty\())(.+?)(?=\))/g // 获取 var:isNotEmpty()
        const regexEq = /(?<=(var:eq\())(.+?)(?=\))/g
        const regexGetOrDefault = /(?<=(vars:getOrDefault\())(.+?)(?=\))/g
        const _cData = cData.match(regex0) ? cData.match(regex0)[0] : cData
        const conditions = _cData.split('&&')
        conditions.forEach(c => {
            const notEmptyC = c.match(regexNotEmpty)
            const eqC = c.match(regexEq)
            const getOrDefault = c.match(regexGetOrDefault)
            if(notEmptyC) {
                result.push({ 
                    properties: notEmptyC[0].replace(/'/g, ''), 
                    calc: 'notEmpty'
                })
            } else if(eqC) {
                const _eqC = eqC[0].split(',')
                const _eqCValue = _eqC[1] === `''` ? 'NULL' : _eqC[1]
                result.push({ 
                    properties: _eqC[0].replace(/'/g, ''), 
                    calc: 'equal',
                    value: _eqCValue
                })
            } else if(getOrDefault) {
                const _getOrDefault = getOrDefault[0].split(',')
                const _getOrDefaultCValue = _getOrDefault[1] === `''` ? 'NULL' : _getOrDefault[1]
                result.push({ 
                    properties: _getOrDefault[0].replace(/'/g, ''), 
                    calc: 'getOrDefault',
                    value: _getOrDefaultCValue
                })
            }
        });
    } catch (error) {
    } finally {
        return result
    }
}
export function setCriterias(nodeDate: any, criterias: criteria[]) {
    if(!nodeDate.sentry.data.ifPart) nodeDate.sentry.data.ifPart = {
        condition: {}
    }
    let condition = nodeDate.sentry.data.ifPart.condition
    const result: string[] = []
    criterias.forEach((c: criteria,index:number) => {
        const cValue = c.value === 'NULL' ? `''` : c.value
        if(c.calc === 'notEmpty') {
            result.push(`var:isNotEmpty(${c.properties})`)
        } else if(c.calc === 'getOrDefault') {
            result.push(`vars:getOrDefault(${c.properties},${cValue})`)
        } else {
            result.push(`var:eq(${c.properties},${cValue})`)
        }
    })
    const _result: string = result.join('&&')
    if(_result){
        condition.__cdata = `\$\{ ${_result} \}`
    }else{
        condition.__cdata = null
    }
    
}
