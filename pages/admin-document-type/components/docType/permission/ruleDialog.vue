<template>
  <el-dialog v-model="visible" title="Hidden Rule" width="600px" :before-close="handleClose" class="scroll-dialog">
    <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-position="top">
      <!-- 规则名称 -->
      <el-form-item label="Rule Name" prop="name">
        <el-input v-model="formData.name" placeholder="请输入规则名称" clearable />
      </el-form-item>
      <DocTypePermissionUserRules ref="UserRulesRef" :targetOptions="userRulesOpts" />
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button v-if="selectedIndex > -1" type="danger" @click="handleRemove">Remove</el-button>
        <el-button type="primary" @click="handleSave">Save</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Delete, Plus } from '@element-plus/icons-vue'

// Emits
const emit = defineEmits(['add', 'remove'])
const { userRulesOpts } = useDocumentTypeOptioins()
// 响应式数据
const visible = ref(false)
const ruleFormRef = ref<FormInstance>()
const isEdit = ref(false)
const selectedIndex = ref(-1)
// 表单数据
const formData = reactive<RuleForm>({
  name: '',
  conditions: [
    {
      attribute: 'userRole',
      condition: 'not_equal',
      value: 'financeManager'
    }
  ]
})

// 表单验证规则
const rules: FormRules = {
  ruleName: [{ required: true, message: '请输入规则名称', trigger: 'blur' }]
}
const UserRulesRef = ref()
// 打开弹窗
const handleOpen = (data: any, index: number = -1) => {
  visible.value = true
  selectedIndex.value = index

  setTimeout(() => {
    formData.name = data?.name ? data.name : ''
    const conditions = data?.conditions ? data.conditions : null
    UserRulesRef.value.setFormData(conditions)
    console.log(data)
  }, 100)
}

// 关闭弹窗
const handleClose = () => {
  visible.value = false
}

// 保存
const handleSave = async () => {
  if (!ruleFormRef.value) return

  try {
    await ruleFormRef.value.validate()
    const conditions = UserRulesRef.value.getFormData()
    if (selectedIndex.value > -1) {
      emit('update', { ...formData, conditions }, selectedIndex.value)
    } else {
      emit('add', { ...formData, conditions })
    }
    ElMessage.success('保存成功')
    handleClose()
  } catch (error) {
    ElMessage.error('请检查表单信息')
  }
}

// 删除
const handleRemove = () => {
  emit('remove', selectedIndex.value)
  ElMessage.success('删除成功')
  handleClose()
}

// 暴露方法给父组件
defineExpose({
  handleOpen
})
</script>

<style scoped></style>
