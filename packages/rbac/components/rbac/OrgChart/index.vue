<template>
  <div class="chart-container" v-loading="loading">
    <template v-if="!loading && roleData.length === 0">
      <el-empty :description="$t('orgChart.noData')"></el-empty>
      <div class="flex-x-center">
        <el-button type="primary" @click="sidebarVisible = true">{{ $t('orgChart.add') }}</el-button>
      </div>
      <RbacOrgChartX6EditSidebar :visible="sidebarVisible" :is-add="true" @close="sidebarVisible = false" @save="handleAdd" />
    </template>
    <RbacOrgChartX6
      v-else
      :data="roleData"
      :node-style="defaultNodeStyle"
      @node-click="handleNodeClick"
      @delete="handleDelete"
      @add="handleAdd"
      @edit="handleEdit"
      @update:data="handleDataUpdate"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { OrgNode } from './X6/types'
import { adminApi } from 'api'
const props = defineProps<{
  roleIds?: string[]
}>()
const defaultNodeStyle = {
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
}
const sidebarVisible = ref(false)
const roleData = ref<OrgNode[]>([])
let uuid = 0


function findNodeById(nodes: OrgNode[], targetId: string): OrgNode | null {
  for (const node of nodes) {
    if (node.id === targetId) {
      return node
    }
    if (node.children) {
      const found = findNodeById(node.children, targetId)
      if (found) {
        return found
      }
    }
  }
  return null
}

async function handleDelete(deleteId: string, newNodes: OrgNode[]) {
  // status:3-逻辑删除
  await adminApi.api
    .putAclRole({
      id: deleteId,
      status: 3
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error('Failed to delete role: ' + err)
    })
  roleData.value = newNodes
}
async function handleEdit(formData: OrgNode, selectedNodeId: string) {
  console.log('handleEdit', formData)
  const dataNode = findNodeById(roleData.value, selectedNodeId)
  if (!dataNode) {
    throw new Error('Node not found : ' + selectedNodeId)
  }
  await adminApi.api
    .putAclRole({
      ...formData,
      id: selectedNodeId, // if id need to be override, then append it to the formData
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error('Failed to update role: ' + err)
    })
  
  Object.assign(dataNode, formData)
}
async function handleAdd(formData: OrgNode, selectedNodeId: string) {
  console.log('handleAdd', formData, selectedNodeId)
  const newNode: OrgNode = {
    name: formData.name || '',
    status: 1
  }
  if (selectedNodeId) {
    try {
      await adminApi.api.postAclRole({...newNode, parentId: selectedNodeId})
        .then((res) => res.data)
        .catch((e) => {
          throw new Error('Failed to add role: ' + e)
        })

      // TODO: 由于api仅返回true，所以需要重新获取全部数据刷新页面
      initData()
      // const dataNode = findNodeById(roleData.value, selectedNodeId)
      // if (!dataNode) return
      // if (!dataNode.children) dataNode.children = []
      // dataNode.children.push(newNodeData)
      sidebarVisible.value = false
    } catch (error) {
      console.error(error)
    }
  } else {
    if (!roleData.value) roleData.value = []
    try {
      const newNodeData = await adminApi.api.postAclRole(newNode).then((res) => res.data)
      // TODO: 由于api仅返回true，所以需要重新获取全部数据刷新页面
      // roleData.value.push(newNodeData)
      initData()
      sidebarVisible.value = false
    } catch (error) {
      console.error(error)
    }
  }
}
const handleNodeClick = (node: OrgNode) => {
  console.log('Clicked node:', node)
}

const handleDataUpdate = (newData: OrgNode[]) => {
  roleData.value = newData
}
const loading = ref(false)
async function initData() {
  try{
    loading.value = true
    if (props.roleIds) {
      const data = await adminApi.api.postAclRoleHierarchy(props.roleIds)
      .then((res) => res.data) as OrgNode[]
      roleData.value = data
      return
    } else {
      let data = await adminApi.api.getAclRoleRoot()
      .then((res) => res.data)
      if(!data) roleData.value = []
      else roleData.value = [data]
    }
  } catch (error) {
    throw new Error('Failed to get role hierarchy: ' + error)
  } finally {
    loading.value = false
  }
  // if roleIds is provided , that means the data return is a list of roleIds
  
}
onMounted(async () => {
  initData()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
