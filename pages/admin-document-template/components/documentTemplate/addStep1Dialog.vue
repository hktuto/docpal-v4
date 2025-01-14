<template>
<el-dialog 
    class="scroll-dialog"
    v-model="state.visible" :title="state.isEdit ? $t('template.editInfo') : $t('template.create')"
    :close-on-click-modal="false" append-to-body
    >
    <FormRenderer ref="FormRendererRef" :form-json="formJson">
    </FormRenderer>
    <template #footer>
        <!-- <el-button @click="createFile('Excel', 'test')"></el-button> -->
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
<TemplateAddStep2Dialog ref="TemplateAddStep2DialogRef"/>
</template>
<script lang="ts" setup>
// import { getJsonApi, CreateTemplateInfoApi, UpdateTemplateInfoApi } from 'dp-api'
import { adminApi } from 'api';
import formJson from './templateAddStep1.vform.json'
const emits = defineEmits([
    'update'
])
const state = reactive<any>({
    loading: false,
    visible: false,
    setting: {},
    isEdit: false
})
const router = useRouter()
const form = reactive({
    labelRule: []
})
const FormRendererRef = ref()
const TemplateAddStep2DialogRef = ref()
async function handleSubmit() {
    const formData = await FormRendererRef.value.vFormRenderRef.getFormData()
    if(!formData) return
    try {
        state.loading = true
        if(state.isEdit) {
            await adminApi.api.putTemplateDocument({
                name: formData.name,
                description: foDirmData.description,
                id: state.setting.id,
                fileType: state.setting.fileType
            })
            emits('update')
        }
        else {
            const file = await createFile(formData.type, formData.name)
            const params = new FormData()
            params.append('file', file)
            params.append('name', formData.name)
            params.append('fileType', formData.type)
            params.append('description', formData.description)
            const templateInfo = await CreateTemplateInfoApi(params)
            console.log(templateInfo);
            router.push(`/template/${templateInfo.id}`)
            // TemplateAddStep2DialogRef.value.handleOpen(templateInfo)
        }
        state.visible = false
    } catch (error) {
    }
    state.loading = false
}

async function handleOpen(setting?) {
    state.visible = true
    setTimeout(async() => {
        await FormRendererRef.value.vFormRenderRef.resetForm()
        if(setting && setting.isEdit) {
            state.isEdit = true
            state.setting = setting
            await FormRendererRef.value.vFormRenderRef.setFormData({...state.setting})
            state.loading = false
        } else {
            state.isEdit = false
            state.setting = {}
        }
    })
}
async function createFile(fileType: 'Word' | 'Excel' | 'PPT' | 'PDF', name: string) {
    const path = `/docTemplate/template${ExtensionMap[fileType]}`
    const file = await fetch(path)
    const fileArrayBuffer = await file.arrayBuffer()
    return new File([fileArrayBuffer], `${name}${ExtensionMap[fileType]}`,{type: ExtensionMimeTypeMap[fileType]})
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
