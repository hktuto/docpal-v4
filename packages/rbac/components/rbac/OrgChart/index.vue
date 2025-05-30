<template>
  <div class="chart-container">
    <template v-if="orgDatas.length === 0">
      <el-empty :description="$t('orgChart.noData')"></el-empty>
      <div class="flex-x-center">
        <el-button type="primary" @click="sidebarVisible = true">{{ $t('orgChart.add') }}</el-button>
      </div>
      <RbacOrgChartX6EditSidebar :visible="sidebarVisible" :is-add="true" @close="sidebarVisible = false" @save="handleAdd" />
    </template>
    <RbacOrgChartX6
      v-else
      :data="orgDatas"
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
const orgDatas = ref<OrgNode[]>([])
let uuid = 0
function getUuid() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000)
  uuid++
  return new Date().toISOString() + randomNumber + uuid
}
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

function handleOpen() {
  console.log('打开')
}
async function handleDelete(deleteId: string, newNodes: OrgNode[]) {
  // status:3-逻辑删除
  const data = await adminApi.api
    .postAclRole({
      id: deleteId,
      status: 3
    })
    .then((res) => res.data)
  orgDatas.value = newNodes
}
async function handleEdit(formData: OrgNode, selectedNodeId: string) {
  console.log('handleEdit', formData)
  try {
    const data = await adminApi.api
      .putAclRole({
        id: selectedNodeId,
        ...formData
      })
      .then((res) => res.data)
    const dataNode = findNodeById(orgDatas.value, selectedNodeId)
    if (!dataNode) return
    Object.assign(dataNode, formData)
  } catch (error) {
    console.error(error)
  }
}
async function handleAdd(formData: OrgNode, selectedNodeId: string) {
  const newNode: OrgNode = {
    name: formData.name || '',
    status: 1
  }
  if (selectedNodeId) {
    try {
      const newNodeData = await adminApi.api.postAclRole(newNode).then((res) => res.data)

      // TODO: 由于api仅返回true，所以需要重新获取全部数据刷新页面
      initData()
      // const dataNode = findNodeById(orgDatas.value, selectedNodeId)
      // if (!dataNode) return
      // if (!dataNode.children) dataNode.children = []
      // dataNode.children.push(newNodeData)
      sidebarVisible.value = false
    } catch (error) {
      console.error(error)
    }
  } else {
    if (!orgDatas.value) orgDatas.value = []
    try {
      const newNodeData = await adminApi.api.postAclRole(newNode).then((res) => res.data)
      // TODO: 由于api仅返回true，所以需要重新获取全部数据刷新页面
      // orgDatas.value.push(newNodeData)
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
  orgDatas.value = newData
}
async function initData() {
  if (props.roleIds) {
    const { data } = await adminApi.api.postAclRoleHierarchy(props.roleIds)
    orgDatas.value = data
    return
  } else {
    let { data } = await adminApi.api.getAclRoleRoot()
    if(!data) orgDatas.value = []
    else orgDatas.value = [data]
  }
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
