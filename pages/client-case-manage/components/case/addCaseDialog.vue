<script setup lang="ts">
import {clientApi} from "api";
import {ElMessage} from 'element-plus'

const {t} = useI18n()
const state = reactive({
    id: '',
    loading: false,
    visible: false,
    title: t('masterTable.newRow')
})
const FromVariablesRendererRef = ref()

async function handleOpen(id: string) {
    try {
        const {data} = await clientApi.api.getCaseInstanceCasetypeidStarttask(id);
        state.id = id
        if (!data) throw new Error("no data");
        const first = data[0];
        state.title = first.name

        const fields = first.fields?.reduce((prev, item) => {
            prev.push({
                ...item,
                name: item.id,
                label: item.name,
                required: item.required || false,
                dataType: item.type
            })
            return prev
        }, [])
        const initData = first.fields?.reduce((prev, item) => {
            if (item.value) prev[item.id] = item.value
            return prev
        }, {})
        setTimeout(() => {
            if (!!fields) FromVariablesRendererRef.value.init(fields, initData)
        })
        state.visible = true
        state.loading = true
    } catch (error) {
        ElMessage.error('no data')
        state.visible = false
    } finally {
        state.loading = false
    }
}

const emits = defineEmits([
    'refresh', 'delete'
])

async function handleSubmit() {
    state.loading = true
    try {
        const data = await FromVariablesRendererRef.value.getData(true)
        await clientApi.api.postCaseInstanceStart({
            caseTypeId: state.id,
            parameters: data
        })
        state.visible = false
        emits('refresh')
    } catch (error) {
        state.loading = false
    }
    state.loading = false
}

const props = withDefaults(defineProps<{
    ignoreList?: string[],
}>(), {
    ignoreList: [],
})

defineExpose({handleOpen})
</script>

<template>
    <el-dialog v-model="state.visible" :title="state.title" class="scroll-dialog" append-to-body
               :close-on-click-modal="false" destroy-on-close @close="handleClose">
        <MasterTableVariableForm ref="FromVariablesRendererRef" :ignoreList="ignoreList"/>
        <template #footer>
            <div class="footer-grid">
                <el-button type="primary" :loading="state.loading" @click="handleSubmit">
                    {{ $t('common_submit') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">

</style>