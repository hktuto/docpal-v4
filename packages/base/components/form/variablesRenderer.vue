<template>
<FormRenderer ref="FormRendererRef" :form-json="formJson" @formChange="formChange"
    @emit="handleEmit">
    <template v-for="(idx, slotName) in $slots" #[slotName]="data">
        <slot :name="slotName" :data="data"></slot>
    </template>
</FormRenderer>
</template>
<script lang="ts" setup>
import type { VariableItem } from '@/types/vform.extend'
import type { FormJson, FormData, WidgetItem, FormVariablesRenderer } from '@/types/vform'
const props = defineProps<{
    variables?: VariableItem[],
}>()
const emits = defineEmits(['formChange'])
const FormRendererRef = ref<FormVariablesRenderer>()
const formJson = ref<FormJson>({
    "widgetList": [],
    "formConfig": {
        "modelName": "formData",
        "refName": "vForm",
        "rulesName": "rules",
        "labelWidth": 80,
        "labelPosition": "top",
        "size": "",
        "labelAlign": "label-left-align",
        "cssCode": "",
        "customClass": [],
        "functions": "",
        "layoutType": "PC",
        "jsonVersion": 3,
        "onFormCreated": "",
        "onFormMounted": "",
        "onFormDataChange": "",
        "onFormValidate": "",
        "saveRemoteOptions": "never",
        "labelFormUniqueName": true,
        "dataSources": []
    }
})
function createJson(variables: VariableItem[]): FormJson {
    console.log("createJson", variables)
    
    const date = new Date().valueOf()
    formJson.value.widgetList = []
    variables.forEach((item: VariableItem, index: number) => {
        const _item: WidgetItem = {
            key: date + index,
            id: item.type + date + index,
            type: item.type,
            formItemFlag: true,
            options: {
                name: item.name,
                label: item.label ? item.label : item.name,
                required: item.required ? true : false,
                defaultValue: '',
                size: '',
                columnWidth: '',
                placeholder: '',
                readonly: false,
                disabled: false,
                hidden: false,
                clearable: true,
                requiredHint: '',
                onValidate: "",
                onCreated: "",
                onMounted: "",
                onInput: "",
                onChange: "",
                onFocus: "",
                onBlur: "",
                onEnter: "",
            }
        }
        if(!['date','input','switch','textarea','number','select', 'json-editor', 'divider'].includes(item.type)) _item.type = 'input'
        if(item.type === 'date') {
            _item.options.format = item.options.type === 'datetime' ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD',  //日期显示格式
            _item.options.valueFormat = 'YYYY-MM-DDTHH:mm:ss.000Z'
            _item.options.onDisabledDate = "const myDate = new Date();\nconst year = myDate.getFullYear() + 100;  \nconst minDate = new Date('1901-01-01 00:00:00').getTime()\nconst maxDate = new Date(year + '-12-31 23:59:59').getTime()\nreturn dateTime.getTime() < minDate || dateTime.getTime() > maxDate;"
        } else if(item.type === 'input') {
            _item.options.type = 'text'
            _item.options.maxLength = 255
            _item.options.showWordLimit = true
        } else if(item.type === 'textarea') {
            _item.options.rows = 5
            _item.options.maxLength = 4000
            _item.options.showWordLimit = true
        }else if(item.type === 'number') {
            _item.options.defaultValue = 0
            _item.options.min = -999999999999998
            _item.options.max = 999999999999998
            _item.options.controlsPosition = 'right'
        } else if(item.type === 'switch') {
            _item.options.defaultValue = false
            _item.options.labelIconPosition = 'rear'
        } else if(item.type === 'select') {
        }
        if (item.options) _item.options = { ..._item.options, ...item.options }
        formJson.value.widgetList.push(_item)
    })
    FormRendererRef.value.vFormRenderRef.setFormJson(formJson.value)
    return formJson.value
}
function handleEmit (funName: string, newValue: any, oldValue: any) {
    emits(funName, newValue, oldValue)
}
async function getData (): Promise<FormData> {
  try {
    const data = await FormRendererRef.value.getFormData()
    return data
  } catch (error) {
  }
}
async function setFormJson (formJson: FormJson) {
    await FormRendererRef.value.vFormRenderRef.setFormJson(formJson)
}
async function setData (data: FormData) {
    await FormRendererRef.value.vFormRenderRef.setFormData(data)
}
function formChange(formData: FormData) {
    emits('formChange', formData)
}
function getWidgetRef (name: string) {
    return FormRendererRef.value.vFormRenderRef.getWidgetRef(name)
}
defineExpose({ createJson, getData, setData, setFormJson, getWidgetRef, FormRendererRef })
</script>
<style lang="scss" scoped>

</style>
