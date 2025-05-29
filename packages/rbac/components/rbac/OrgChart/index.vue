<template>
  <div class="chart-container">
    <template v-if="orgDatas.length === 0">
      <el-empty :description="$t('noData')"></el-empty>
      <div class="flex-x-center"><el-button type="primary" @click="sidebarVisible = true">添加</el-button></div>
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

const defaultNodeStyle = {
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
}
const sidebarVisible = ref(false)
const orgDatas = ref<OrgNode[]>([
  {
    id: '1',
    name: 'John Doe',
    title: 'CEO',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    style: { background: '#e6f7ff' },
    children: [
      {
        id: '2',
        name: 'Sarah Smith',
        title: 'CTO',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        style: { background: '#f6ffed' },
        parentId: '1',
        children: [
          {
            id: '4',
            name: 'Michael Johnson',
            title: 'Tech Lead',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            parentId: '2',
            children: [
              {
                id: '7',
                name: 'Emma Davis',
                title: 'Senior Developer',
                avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
                parentId: '4'
              },
              {
                id: '8',
                name: 'James Wilson',
                title: 'Senior Developer',
                avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
                parentId: '4'
              }
            ]
          },
          {
            id: '5',
            name: 'Lisa Anderson',
            title: 'Product Manager',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            parentId: '2'
          },
          {
            id: '56',
            name: 'Lisa Anderson1',
            title: 'Product Manager',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            parentId: '2'
          },
          {
            id: '57',
            name: 'Lisa Anderson1',
            title: 'Product Manager',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            parentId: '2'
          }
        ]
      },
      {
        id: '3',
        name: 'Robert Brown',
        title: 'CFO',
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
        style: { background: '#fff7e6' },
        parentId: '1',
        children: [
          {
            id: '6',
            name: 'David Miller',
            title: 'Financial Analyst',
            parentId: '3',
            avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
          }
        ]
      }
    ]
  },
  {
    id: '1123142134',
    name: 'David Mssiller',
    title: 'Financial Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
  }
])
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
function handleDelete(deleteId: string, newNodes: OrgNode[]) {
  // /docpal/rbac/update 3-逻辑删除
  // TODO: api,删除节点接口
  console.log('删除节点', deleteId, newNodes)
  orgDatas.value = newNodes
}
function handleEdit(formData: OrgNode, selectedNodeId: string) {
  // /docpal/rbac/update 1-启用 2-禁用
  // TODO: api,编辑节点接口
  const dataNode = findNodeById(orgDatas.value, selectedNodeId)
  if (!dataNode) return
  console.log('编辑节点', formData, dataNode)
  Object.assign(dataNode, formData)
}
function handleAdd(formData: OrgNode, selectedNodeId: string) {
  // TODO: api,没有 selectedNodeId 时，创建父节点
  // TODO: api,有 selectedNodeId 时，添加子节点
  console.log('添加节点', formData, selectedNodeId)
  const newNode: OrgNode = {
    id: getUuid().toString(),
    name: formData.name || '',
    children: []
  }
  if (selectedNodeId) {
    const dataNode = findNodeById(orgDatas.value, selectedNodeId)
    if (!dataNode) return
    if (!dataNode.children) dataNode.children = []
    dataNode.children.push(newNode)
  } else {
    sidebarVisible.value = false
    if(!orgDatas.value) orgDatas.value = []
    orgDatas.value.push(newNode)
  }
}
const handleNodeClick = (node: OrgNode) => {
  console.log('Clicked node:', node)
}

const handleDataUpdate = (newData: OrgNode[]) => {
  orgDatas.value = newData
}

const {
  public: { DASHBOARD_PROXY, CLIENT_PROXY, ADMIN_PROXY, PROXY }
} = useRuntimeConfig()
onMounted(async () => {
  // TODO: api,请求结构图数据
  console.log(ADMIN_PROXY)
  // const {data} = await fetch(`${ADMIN_PROXY}/docpal/rbac/hierarchy`,{
  //       method:'POST',
  //       body: [],
  //       headers: {
  //           'Content-Type': 'application/json'
  //       }
  //   }).then(async(res) => await res.json())
  //   .catch(error => {
  //       console.log("error", error)
  //   })
  // console.log(orgDatas.value)
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
