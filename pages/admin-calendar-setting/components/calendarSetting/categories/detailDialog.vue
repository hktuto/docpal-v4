<script lang="ts" setup>
import {ElColorPicker, ElDialog} from 'element-plus';
import {adminApi} from 'api';

const categoriesColumn = useCategoriesColumn()
const {setting} = useCalendarStore();
const opened = ref(false);
const currentData = ref();
const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw createError('menu manger not found')
}

const emits = defineEmits(['submit']);

const form = ref<FormItem[]>([])
type FormItem = {
  label: string,
  field: string,
  value: string,
  type: 'string' | 'color',
  required: boolean,
}
const {t} = useI18n()
const ignoreColumns = ["id", "created_date", "created_by", "modified_date", "status", "modified_by"];

function createFormFromColumn() {
  form.value = categoriesColumn.value.filter(c => !ignoreColumns.includes(c.columnName)).map((item: any) => {
    return {
      label: item.columnName,
      field: item.columnName,
      value: "",
      type: ['color', 'Container_Color', 'onContainer'].includes(item.columnName) ? 'color' : 'string',
      required: item.required,
    }
  })
  if (currentData.value) {
    form.value.forEach(item => {
      if (currentData.value[item.field]) {
        item.value = currentData.value[item.field]
      }
    })
  }
}

async function submit() {
  const data: Record<string, any> = form.value.reduce((result: any, item) => {
    result[item.field] = item.value
    return result
  }, {})
  if (currentData.value) {
    // edit item
    await adminApi.api.putMasterTablesIdRecord(setting.value.category.master_table, {
      data: [data],
      where: {
        id: currentData.value.id
      }
    })
  } else {

    await adminApi.api.postMasterTablesRecord({
      id: setting.value.category.master_table,
      data: [data]
    })

  }
  emits('submit')
  routerProvider?.message.success(t('dpMsg_success'))
  opened.value = false
}

function open(item?: any) {
  if (item) {
    currentData.value = item
  } else {
    currentData.value = null
  }
  createFormFromColumn()
  opened.value = true;
}

defineExpose({
  open
})

</script>


<template>
  <ElDialog v-model="opened">
    <ElForm :model="form" label-position="top" @submit.stop="" show-close>
      <ElFormItem v-for="item in form" :label="item.label" :key="item.field" :prop="item.field">
        <template v-if="item.type === 'color'">
          <ElColorPicker v-model="item.value"></ElColorPicker>
        </template>
        <template v-else>
          <ElInput v-model="item.value" :type="item.type"></ElInput>
        </template>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton :id="`CalendarSetting__EventLocations__EventCategories__Add__${currentData ? 'Confirm' : 'Add'}`"
                type="primary" @click="submit">
        {{ currentData ? $t("confirm") : $t("Add") }}
      </ElButton>
    </template>
  </ElDialog>
</template>