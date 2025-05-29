<template>
  <div class="sidebar-overlay" v-if="visible" @click.self="$emit('close')">
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>{{ isAdd ? '添加角色' : '编辑角色' }}</h3>
        <el-button class="close-btn" link @click="$emit('close')">×</el-button>
      </div>
      <div class="sidebar-content">
        <el-form 
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
        >
          <el-form-item 
            label="Role Label" 
            prop="name"
            required
          >
            <el-input v-model="formData.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item  v-if="nodeData?.parentName"
            label="Parent Role" 
            prop="parentName" 
          >
            <el-input v-model="nodeData.parentName" :disabled="true" placeholder="请输入父级角色" />
          </el-form-item>
        </el-form>
        
        <UserTable 
          :role-id="props.nodeData?.id"
          :isAdd="props.isAdd"
          @update:users="handleUsersUpdate"
        />
      </div>
      <div class="sidebar-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { OrgNode } from '../types'
import type { FormInstance, FormRules } from 'element-plus'
import UserTable from './userTable.vue'

const props = defineProps<{
  visible: boolean
  nodeData?: OrgNode
  isAdd?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: Partial<OrgNode>): void
}>()

const formRef = ref<FormInstance>()
const formData = ref({
  name: '',
})

const rules = ref<FormRules>({
  name: [
    { 
      validator: (rule, value: string, callback) => {
        if (!value || value.trim() === '') {
          callback(new Error('请输入角色名称'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    },
    { min: 2, message: '长度至少为2个字符', trigger: 'blur' }
  ]
})

watch(() => props.visible, () => {
  if (!props.isAdd && props.nodeData) {
    formData.value = {
      name: props.nodeData.name || '',
    }
  } else {
    formData.value = {
      name: '',
    }
  }
  // 重置表单校验状态
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}, { immediate: true })

const handleSave = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    emit('save', {
      ...formData.value,
      name: formData.value.name.trim()
    })
  } catch (error) {
    // 表单验证失败
    console.error('Form validation failed')
  }
}

const handleUsersUpdate = (users: any[]) => {
  // 处理用户更新
  console.log('Users updated:', users)
  if(props.isAdd) {
    formData.value.users = users
  }
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.sidebar {
  width: 600px;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-btn {
  font-size: 24px;  
}
.sidebar-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}
</style> 
