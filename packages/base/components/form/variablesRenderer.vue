<template>
  <FormRenderer ref="FormRendererRef" :form-json="formJson" @formChange="formChange" @emit="handleEmit">
    <template v-for="(idx, slotName) in $slots" #[slotName]="data">
      <slot :name="slotName" :data="data"></slot>
    </template>
  </FormRenderer>
</template>
<script lang="ts" setup>
import type { VariableItem } from '@/types/vform.extend'
import type { FormJson, FormData, WidgetItem, FormVariablesRenderer } from '@/types/vform'
import { useMetadata } from '@/components/meta/metadata'
const { vFormWidgetListDecorator } = useMetadata()
const props = defineProps<{
  variables?: VariableItem[]
}>()
const emits = defineEmits(['formChange'])
const FormRendererRef = ref<FormVariablesRenderer>()
const formJson = ref<FormJson>({
  widgetList: [],
  formConfig: {
    modelName: 'formData',
    refName: 'vForm',
    rulesName: 'rules',
    labelWidth: 80,
    labelPosition: 'top',
    size: '',
    labelAlign: 'label-left-align',
    cssCode: '',
    customClass: [],
    functions: '',
    layoutType: 'PC',
    jsonVersion: 3,
    onFormCreated: '',
    onFormMounted: '',
    onFormDataChange: '',
    onFormValidate: '',
    saveRemoteOptions: 'never',
    labelFormUniqueName: true,
    dataSources: []
  }
})
function createJson(variables: VariableItem[]): FormJson {
  formJson.value.widgetList = vFormWidgetListDecorator(variables)
  FormRendererRef.value?.vFormRenderRef.setFormJson(formJson.value)
  return formJson.value
}
function handleEmit(funName: any, newValue: any, oldValue: any) {
  emits(funName, newValue, oldValue)
}
async function getData(): Promise<any> {
  try {
    const data = await FormRendererRef.value?.getFormData()
    return data
  } catch (error) {
    return null
  }
}
async function setFormJson(formJson: FormJson) {
  await FormRendererRef.value?.vFormRenderRef.setFormJson(formJson)
}
async function setData(data: FormData) {
  await FormRendererRef.value?.vFormRenderRef.setFormData(data)
}
function formChange(formData: FormData) {
  emits('formChange', formData)
}
function getWidgetRef(name: string) {
  return FormRendererRef.value?.vFormRenderRef.getWidgetRef(name)
}
defineExpose({ createJson, getData, setData, setFormJson, getWidgetRef, FormRendererRef })
</script>
<style lang="scss" scoped></style>
