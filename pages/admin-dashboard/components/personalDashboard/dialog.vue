<template>
    <el-dialog
        v-model="state.visible"
        :title="title"
        class="scroll-dialog"
        append-to-body
        :close-on-click-modal="false"
        @close="handleClose"
    >
        <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
        <template #footer>
            <div class="footer-grid">
                <el-button type="primary" :loading="state.loading" @click="handleSubmit">
                    {{ $t("common_submit") }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import {adminApi} from "api";
import formJson from "./dialog.vform.json";
import {ElMessage} from "element-plus";

const emits = defineEmits(["refresh", "delete", "add"]);
const {t} = useI18n()
const state = reactive({
    loading: false,
    visible: false,
    setting: {},
    edit: false,
});
const FormRendererRef = ref();

async function handleSubmit() {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData();
    state.loading = true;
    const _data = {
        name: data.name,
        groupId: data.access.join(","),
    };
    try {
        if (state.edit) {
            const res = await adminApi.api.putPersonalDashboardUpdate({
                ...state.setting,
                ..._data,
            });
            ElMessage.success(t('workPanel_updateSuccessMsg', {name: _data.name}))
            emits("refresh");
        } else {
            const res = await adminApi.api.postPersonalDashboardSave({
                ..._data,
                styleJson: "{}",
            }).then(res => res.data)
            ElMessage.success(t('workPanel_createdSuccessMsg', {name: _data.name}))
            // emits('add', res)
        }
        state.visible = false;
    } catch (error) {
    } finally {
        state.loading = false;
    }
}

let title = t('workPanel_create')

function handleOpen(setting?) {
    state.visible = true;
    state.edit = false;
    if (!setting) {
        title = t('workPanel_create')
        setTimeout(async () => {
            FormRendererRef.value.vFormRenderRef.resetForm();
        });
        return;
    }
    title = t('workPanel_edit')
    setTimeout(async () => {
        const _setting = deepCopy(setting);
        state.edit = _setting.edit = true;
        state.setting = _setting;
        if (_setting.access) _setting.access = _setting.access.split(",");
        else _setting.access = [];
        await FormRendererRef.value.vFormRenderRef.setFormData({
            ..._setting,
        });
        state.loading = false;
    });
}

function handleDelete() {
    emits("delete");
    state.visible = false;
}

defineExpose({handleOpen});
</script>
<style lang="scss" scoped></style>
