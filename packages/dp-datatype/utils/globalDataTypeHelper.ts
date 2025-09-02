import DataTypeBoolean from '../components/dataType/boolean.vue'
import DataTypeCase from '../components/dataType/case.vue'
import DataTypeDate from '../components/dataType/date.vue'
import DataTypeDocument from '../components/dataType/document.vue'
import DataTypeMasterTable from '../components/dataType/masterTable.vue'
import DataTypeNumber from '../components/dataType/number.vue'
import DataTypeSelect from '../components/dataType/select.vue'
import DataTypeText from '../components/dataType/text.vue'
import DataTypeUser from '../components/dataType/user.vue'
import DataTypeUserRoleUserGroup from '../components/dataType/userRoleUserGroup.vue'
import DataTypeWorkflow from '../components/dataType/workflow.vue'
import { METADATA_OPTIONS } from './dataTypeHelper'

export const mapDataType = {
  Boolean: DataTypeBoolean,
  Case: DataTypeCase,
  Date: DataTypeDate,
  Document: DataTypeDocument,
  MasterTable: DataTypeMasterTable,
  Number: DataTypeNumber,
  Select: DataTypeSelect,
  Text: DataTypeText,
  User: DataTypeUser,
  UserRoleUserGroup: DataTypeUserRoleUserGroup,
  Workflow: DataTypeWorkflow
}
export function getDefaultByType(value: any) {
  const options = METADATA_OPTIONS.reduce((acc: any, item: any) => {
    acc.push(...item.options)
    return acc
  }, [])
  const type = options.find((item: any) => item.validation.validationRuleName === value || item.name === value)
  return type.validation
}
