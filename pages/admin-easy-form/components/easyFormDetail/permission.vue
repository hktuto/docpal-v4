<template>
  <el-card>
    <h3 class="title">{{ $t('easyForm.permission') }}</h3>
    <el-form ref="FormRef" label-position="top" :model="form">
      <el-formItem
        :label="$t('user_UserGroup')"
        prop="permission"
        :rules="[{ required: true, message: $t('user_UserGroup') + $t('render.hint.fieldRequired') }]"
      >
        <el-select
          v-model="form.permission"
          multiple
          filterable
          clearable
          :placeholder="t('common_selectedIsMultiSelectRequiredMsg')"
          :disabled="state.loading"
          @change="handleChange"
        >
          <template v-for="item in state.groups">
            <el-option v-if="item.id" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </el-formItem>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { adminApi } from 'api'

const { t } = useI18n()
const props = defineProps(['detail'])

const state = reactive<any>({
  groups: '',
  loading: false
})
const form = ref({
  permission: ''
})

async function handleChange() {
  try {
    state.loading = true
    if (form.value.permission.length === 0) return
    await adminApi.api.postFormDesignSavePermission({
      id: props.detail.id,
      permission: form.value.permission.join(',')
    })
    routerProvider?.message.success(t('dpMsg_success'))
  } catch (error) {
  } finally {
    state.loading = false
  }
}

async function getAllUserGroup() {
  state.groups = await adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
}

onMounted(() => getAllUserGroup())
watch(
  () => props.detail,
  (newValue, oldValue) => {
    if (!!oldValue && oldValue.permission === newValue.permission) return
    if (!!newValue.permission) form.value.permission = newValue.permission.split(',')
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped></style>
