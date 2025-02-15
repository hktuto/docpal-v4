<script lang="ts" setup>
import { ElColorPicker, ElDialog } from 'element-plus';
import { adminApi } from 'api';

const { setting, categoriesColumn } = useCalendarStore();
const opened = ref(false);

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('menu manger not found')
}

const emits = defineEmits(['submit']);

const form = ref<FormItem[]>([])
type FormItem = {
    label:string,
    field: string,
    value: string,
    type: 'string' | 'color',
    required: boolean,
}
const { t } = useI18n()
const ignoreColumns = ["id", "created_date", "created_by", "modified_date", "status", "modified_by"];

function createFormFromColumn() {
    form.value = categoriesColumn.value.filter(c => !ignoreColumns.includes(c.columnName)).map((item: any) => {
        return {
            label: item.columnName,
            field: item.columnName,
            value: "",
            type: item.columnName === 'color' ? 'color' : 'string',
            required: item.required,
        }
    })
}

async function submit(){
    const data:Record<string, any> = form.value.reduce((result:any, item) => {
        result[item.field] = item.value
        return result
    },{}) 
    await adminApi.api.postMasterTablesRecord({
        id: setting.value.category.master_table,
        data: [data]
      })   

    emits('submit')
    routerProvider?.message.success(t('dpMsg_success'))
    opened.value = false
}

function open() {
    createFormFromColumn()
    opened.value = true;
}

defineExpose({
  open
})

</script>


<template>
    <ElDialog v-model="opened"  >
        <ElForm :model="form" label-position="top" @submit.stop="" show-close>
            <ElFormItem v-for="item in form" :label="item.label" :key="item.field" :prop="item.field">
                <template v-if="item.type === 'color'">
                    <ElColorPicker v-model="item.value" ></ElColorPicker>
                </template>
                <template v-else>
                    <ElInput v-model="item.value" :type="item.type"></ElInput>
                </template>
            </ElFormItem>
        </ElForm>
        <template #footer>
            <ElButton type="primary" @click="submit">{{ $t("Add") }}</ElButton>
        </template>
    </ElDialog>
</template>