import { ElMessage } from 'element-plus'
export function getNameByLabelRule(labelRules: any, data: any) {
  const date = new Date()
  const userId: string = useUserId().value
  try {
    if (!labelRules || labelRules.length === 0) throw new Error('no labelRules')
    else {
      return labelRules.reduce((prev: any, rule: any, index: number) => {
        const joiner = index === 0 ? '' : '-'
        if (!rule.metadata) rule.metadata = rule.metaData
        if (rule.metadata === 'fc:createDate') {
          prev += joiner + formatDate(date)
        } else if (rule.metadata === 'fc:label') {
          if (!!data.label) prev += joiner + data.label
        } else if (rule.metadata === 'fc:creator') {
          prev += joiner + userId
        } else if (rule.metadata === 'fc:docTitle') {
          if (!!data.docName) prev += joiner + data.docName
        } else if (rule.dataType === 'date') {
          if (!!data[rule.metadata]) joiner + formatDate(data[rule.metadata])
        } else {
          if (!!data[rule.metadata]) prev += joiner + data[rule.metadata]
        }
        return prev
      }, '')
    }
  } catch (error: any) {
    ElMessage.error(error)
  }
  return data.label + '-' + formatDate(date)
}

export function getLabelList(labelRules: string) {
  return labelRules ? jsonParse(labelRules) : [{ dataType: 'string', metadata: 'fc:docTitle', noDelete: true }]
}
function jsonParse(str: any) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}
export function hasPreviewName(previewName: string) {
  if (!previewName) previewName = ''
  const name = previewName.replaceAll('-', '')
  return name
}
