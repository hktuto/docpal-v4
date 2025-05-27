<template>
  <div ref="container" class="x6-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Graph, Shape, Addon } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'

// 自定义组织架构节点组件
const OrgNode = defineComponent({
  props: ['node'],
  template: `
    <div class="org-node">
      <div class="header">{{ node.data.deptName }}</div>
      <div class="content">
        <div v-for="(user, i) in node.data.users" :key="i" class="user">
          {{ user.name }} ({{ user.title }})
        </div>
      </div>
    </div>
  `
})

// 注册 Vue 节点
register({
  shape: 'vue-org-node',
  component: OrgNode
})

const container = ref(null)
let graph = null

onMounted(() => {
  // 初始化画布
  graph = new Graph({
    container: container.value,
    width: 1200,
    height: 800,
    grid: true,
    connecting: {
      router: 'er', // 智能路由
      connector: 'rounded', // 圆角连线
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: true,
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                // 箭头配置
                name: 'block',
                size: 8
              }
            }
          },
          tools: ['boundary', 'vertices'] // 连线工具
        })
      }
    }
  })

  initOrgChart()
})

// 初始化组织结构数据
const initOrgChart = () => {
  const nodes = [
    {
      id: 'ceo',
      shape: 'vue-org-node',
      x: 500,
      y: 50,
      data: {
        deptName: '董事会',
        users: [
          { name: '张三', title: '董事长' },
          { name: '李四', title: '副董事长' }
        ]
      }
    },
    {
      id: 'tech',
      shape: 'vue-org-node',
      x: 300,
      y: 250,
      data: {
        deptName: '技术中心',
        users: [
          { name: '王五', title: 'CTO' },
          { name: '赵六', title: '架构师' }
        ]
      }
    },
    {
      id: 'prod',
      shape: 'vue-org-node',
      x: 700,
      y: 250,
      data: {
        deptName: '产品中心',
        users: [
          { name: '陈七', title: 'CPO' },
          { name: '孙八', title: '产品总监' }
        ]
      }
    }
  ]

  const edges = [
    { source: 'ceo', target: 'tech' },
    { source: 'ceo', target: 'prod' }
  ]

  graph.fromJSON({ nodes, edges })

  // 自动调整显示
  graph.zoomToFit({ padding: 50 })
}

// 组件卸载时销毁
onBeforeUnmount(() => {
  if (graph) graph.dispose()
})
</script>

<style>
.x6-container {
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  background: white;
}

.org-node {
  width: 240px;
  background: #fff;
  border: 2px solid #5f95ff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.org-node .header {
  padding: 8px;
  font-weight: bold;
  background: #5f95ff;
  color: white;
  border-radius: 4px 4px 0 0;
}

.org-node .content {
  padding: 12px;
}

.user {
  padding: 4px 0;
  border-bottom: 1px dashed #eee;
  font-size: 0.9em;
}
</style>
