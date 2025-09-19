// import { globalApi } from 'api'
import { ref, onMounted } from 'vue'

export const useContactDetailHelper = () => {
  const DEFAULT_FIELD = ['name', 'email']
  const attributes = ref<any>([])
  const attributesVForm = ref<any>([])
  const contactBookDetail = ref<any>({})
  const reg = {
    email: {
      validation: 'email',
      validationHint: ''
    }
  }
  function init(data: any) {
    contactBookDetail.value = data
    // 排序 DEFAULT_FIELD先排
    attributes.value = data.attributes.sort((a, b) => {
      if (DEFAULT_FIELD.includes(a.value)) return -1
      return a.value.localeCompare(b.value)
    })
    attributesVForm.value = attributes.value.map((item: any) => {
      const _item: any = {
        name: item.value,
        label: item.name,
        type: item.dataType,
        required: DEFAULT_FIELD.includes(item.value)
      }
      if (reg[item.value]) {
        _item.options = {
          validation: reg[item.value].validation,
          validationHint: reg[item.value].validationHint
        }
      }
      return _item
    })
  }
  function getAttrMapping(selectOpts: any[]) {
    return attributes.value.map((item: any) => {
      const _item: any = {
        name: item.value,
        label: item.name,
        type: 'select',
        options: {},
        required: DEFAULT_FIELD.includes(item.value)
      }
      if (selectOpts && selectOpts.length > 0) {
        _item.options.optionItems = selectOpts
      }
      return _item
    })
  }
  return {
    init,
    getAttrMapping,
    attributesVForm,
    contactBookDetail
  }
}
