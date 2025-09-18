// import { globalApi } from 'api'
import { ref, onMounted } from 'vue'

export const useContactDetailHelper = () => {
  const attributes = ref<any>([])
  const attributesVForm = ref<any>([])
  const contactBookDetail = ref<any>({})
  function init(data: any) {
    contactBookDetail.value = data
    attributes.value = data.attributes
    attributesVForm.value = data.attributes.map((item: any) => {
      return {
        name: item.value,
        label: item.name,
        type: item.dataType,
        required: ['name', 'email'].includes(item.value)
      }
    })
  }
  function getAttrMapping(selectOpts: any[]) {
    return attributes.value.map((item: any) => {
      const _item: any = {
        name: item.value,
        label: item.name,
        type: 'select',
        options: {},
        required: ['name', 'email'].includes(item.value)
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
