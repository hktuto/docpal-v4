<template>
  <div class="sidebar-overlay" v-if="visible" @click.self="$emit('close')">
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>{{ isAdd ? '添加子节点' : '编辑节点' }}</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <div class="sidebar-content">
        <div class="form-group">
          <label>姓名</label>
          <input v-model="formData.name" type="text" placeholder="请输入姓名">
        </div>
        <div class="form-group">
          <label>职位</label>
          <input v-model="formData.title" type="text" placeholder="请输入职位">
        </div>
        <div class="form-group" v-for="item in 10" :key="item">
          <label>头像URL</label>
          <input v-model="formData.avatar" type="text" placeholder="请输入头像URL">
        </div>
        <div class="preview" v-if="formData.avatar">
          <img :src="formData.avatar" alt="Avatar preview">
        </div>
      </div>
      <div class="sidebar-footer">
        <button class="cancel-btn" @click="$emit('close')">取消</button>
        <button class="save-btn" @click="handleSave">保存</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { OrgNode } from './types'

const props = defineProps<{
  visible: boolean
  nodeData?: OrgNode
  isAdd?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', data: Partial<OrgNode>): void
}>()

const formData = ref({
  name: '',
  title: '',
  avatar: ''
})

watch(() => props.visible, () => {
  if (!props.isAdd) {
    formData.value = {
      name: props.nodeData?.name || '',
      title: props.nodeData?.title || '',
      avatar: props.nodeData?.avatar || ''
    }
  } else {
    formData.value = {
      name: '',
      title: '',
      avatar: ''
    }
  }
}, { immediate: true })

const handleSave = () => {
  emit('save', formData.value)
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
  width: 400px;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #666;
}

.sidebar-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.preview {
  margin-top: 16px;
  text-align: center;
}

.preview img {
  max-width: 100px;
  border-radius: 50%;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn, .save-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: white;
  border: 1px solid #ddd;
}

.save-btn {
  background: #1890ff;
  border: none;
  color: white;
}

.save-btn:hover {
  background: #40a9ff;
}
</style> 
