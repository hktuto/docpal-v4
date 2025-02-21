<template>
    <el-dialog v-model="state.visible" :title=title :close-on-click-modal="false" destroy-on-close>
        <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
        <template #footer>
            <el-button :loading="state.loading" @click="handleSubmit">{{ $t('common_save') }}</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import formJson from './collectionDialog.vform.json'
import {ElMessage} from "element-plus";
import {clientApi} from "api";

const {t} = useI18n()
const state = reactive({
    loading: false,
    visible: false
})

let title = t('collections_new');

/**
 *
 * @param status 狀態（true: 修改, false: 新增）
 * @param collection 收藏夾對象
 */
function handleOpen(status: boolean, collection: object) {
    if (status) {
        title = t('collections_edit')
        setTimeout(() => {
            FormRendererRef.value.vFormRenderRef.setFormData(collection)
        })
    } else {
        title = t('collections_new')
    }
    state.visible = true
}

const emits = defineEmits([
    'refresh'
])

const FormRendererRef = ref()

async function handleSubmit() {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    state.loading = true
    let params = {
        name: data.name,
        description: null
    }

    try {
        if (data.id) {
            // update
            params.idOrPath = data.id
            await clientApi.api.patchNuxeoCollection(params)
        } else {
            // add
            await clientApi.api.postNuxeoCollectionCreate(params)
        }
        ElMessage.success(t('dpMsg_success'))
        state.visible = false
        FormRendererRef.value.vFormRenderRef.resetForm()
        emits('refresh')
    } catch (error) {

    }
    state.loading = false
}

defineExpose({handleOpen})
</script>
