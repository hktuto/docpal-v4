<template>
  <div class="chart-container" :style="{ '--node-width': `${NODE_WIDTH}px`, '--node-height': `${NODE_HEIGHT}px` }">
    <div ref="containerRef" style="width: 100%; height: 100%" @contextmenu.prevent />
    <RbacOrgChartX6ContextMenu :visible="contextMenuVisible" :position="contextMenuPosition" @edit="handleEdit" @add="handleAdd" @delete="handleDelete" />
    <RbacOrgChartX6EditSidebar :visible="sidebarVisible" :node-data="selectedNode" :is-add="isAddingNode" @close="closeSidebar" @save="handleSave" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import { DagreLayout } from '@antv/layout'
import type { PropType } from 'vue'
import OrgChartNodePerson from './nodes/person.vue'
import './styles.css'


interface OrgNode {
  id: string
  name: string
  title?: string
  avatar?: string
  children?: OrgNode[]
  style?: Record<string, string | number>
  collapsed?: boolean
}

const props = defineProps({
  data: {
    type: Array as PropType<OrgNode[]>,
    required: true
  },
  nodeStyle: {
    type: Object as PropType<Record<string, string | number>>,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'nodeClick', node: OrgNode): void
  (e: 'update:data', data: OrgNode[]): void
  (e: 'delete', id: string, data: OrgNode[]): void
  (e: 'add', formData: OrgNode, selectedNodeId: string): void
  (e: 'edit', formData: OrgNode, selectedNodeId: string): void
}>()

const contextMenuVisible = ref(false)
const contextMenuPosition = ref({ left: '0px', top: '0px' })
const sidebarVisible = ref(false)
const selectedNode = ref<OrgNode | null>(null)
const isAddingNode = ref(false)
const selectedCell = ref<any>(null)



const containerRef = ref<HTMLDivElement | null>(null)
const graphRef = ref<Graph | null>(null)

const NODE_WIDTH = 120 // 节点宽度
const NODE_HEIGHT = 50 // 节点高度
const VERTICAL_GAP = 50 // 垂直间距

// Register custom Vue shape
register({
  shape: 'org-node-person',
  width: NODE_WIDTH,
  height: NODE_HEIGHT,
  component: OrgChartNodePerson
})

// 检查位置是否有碰撞
const hasCollision = (graph: Graph, x: number, y: number, excludeNode?: any) => {
  const nodes = graph.getNodes()
  const buffer = 10 // 额外的碰撞检测缓冲区

  return nodes.some((node) => {
    if (node === excludeNode) return false
    const pos = node.position()
    return x < pos.x + NODE_WIDTH + buffer && x + NODE_WIDTH + buffer > pos.x && y < pos.y + NODE_HEIGHT + buffer && y + NODE_HEIGHT + buffer > pos.y
  })
}

// 找到可用的位置
const findAvailablePosition = (graph: Graph, baseX: number, baseY: number, node: any) => {
  let x = baseX
  let y = baseY

  // 如果当前位置有碰撞，向右偏移直到找到可用位置
  while (hasCollision(graph, x, y, node)) {
    x += NODE_WIDTH + 20
  }

  return { x, y }
}

const createGraph = () => {
  if (!containerRef.value) return

  const graph = new Graph({
    container: containerRef.value,
    grid: {
      visible: true,
      type: 'mesh',
      args: {
          color: '#eee',
          thickness: 1
      }
    },
    background: {
        color: 'var(--app-grey-9000)',
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: ['ctrl', 'meta']
    },
    connecting:{
        connector: 'rounded',
        allowMulti: true,
    },
    scaling:{
        min: 0.2, max: 1.2
    },
    panning: true,
    interacting: {
      nodeMovable: false
    }
  })

  // 添加右键菜单事件
  graph.on('cell:contextmenu', ({ cell, e }: { cell: any, e: MouseEvent }) => {
    handleContextMenu(e, cell)
  })

  graph.on('cell:dblclick', ({ cell }) => {
    selectedCell.value = cell
    selectedNode.value = cell.getData()
    handleEdit()
  })

  // 点击空白处关闭右键菜单
  graph.on('blank:click', () => {
    closeContextMenu()
  })

  // 点击节点关闭右键菜单
  graph.on('cell:click', ({ cell }) => {
    closeContextMenu()
    const nodeData = cell.getData()
    emit('nodeClick', nodeData)
  })

  graphRef.value = graph
  return graph
}

/**
 * @deprecated
 * old logic for reference, should remove it after new logic is verified
 *
 */
// const renderTree = (graph: Graph, nodeData: OrgNode, parentNode?: any, x = 300, y = 50) => {
//   // 找到可用位置
//   const { x: availableX, y: availableY } = findAvailablePosition(graph, x, y, null)

//   const node = graph.addNode({
//     x: availableX,
//     y: availableY,
//     shape: 'org-node-person',
//     data: {
//       ...nodeData,
//       style: { ...props.nodeStyle, ...nodeData.style },
//       collapsed: nodeData.collapsed || false
//     }
//   })

//   if (parentNode) {
//     graph.addEdge({
//       source: parentNode,
//       target: node,
//       connector: {
//         name: 'rounded'
//       },
//       attrs: {
//         line: {
//           stroke: '#8f8f8f',
//           strokeWidth: 1,
//           targetMarker: null,
//           sourceMarker: null
//         }
//       },
//       router: {
//         name: 'er',
//         args: {
//           direction: 'V'
//         }
//       }
//     })
//   }

//   if (nodeData.children && !nodeData.collapsed) {
//     const childWidth = NODE_WIDTH + VERTICAL_GAP // 节点宽度 + 间距
//     const startX = availableX - ((nodeData.children.length - 1) * childWidth) / 2

//     nodeData.children.forEach((child, index) => {
//       const baseChildX = startX + index * childWidth
//       renderTree(graph, child, node, baseChildX, availableY + NODE_HEIGHT + VERTICAL_GAP)
//     })
//   }

//   return node
// }
// end of old logic

/**
 *  init graph
 *  use to render data to graph
 */
const initGraph = () => {
  const graph = graphRef.value ? graphRef.value : createGraph()
  if (!graph) return

  graph.clearCells()

  // 渲染每个根节点
  // convert data to antx6 data
  const graphData = {
    nodes: [],
    edges: []
  } as {
    nodes: any[],
    edges: any[]
  }
  // Convert hierarchical data to flat arrays of nodes and edges
  const processNode = (node: OrgNode, parentId?: string) => {
    // Create node
    graphData.nodes.push({
      id: node.id,
      shape: 'org-node-person',
      data: node,
      position: { x: 0, y: 0 }, // Position will be set by layout
    })

    // Create edge if there's a parent
    if (parentId) {
      graphData.edges.push({
        source: parentId,
        target: node.id,
        connector: {
          name: 'rounded'
        },
        attrs: {
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            targetMarker: null,
            sourceMarker: null
          }
        },
        router: {
          name: 'er',
          args: {
            direction: 'V'
          }
        }
      })
    }

    // Process children recursively
    if (node.children && !node.collapsed) {
      node.children.forEach(child => processNode(child, node.id))
    }
  }

  // Process each root node
  props.data.forEach(rootNode => processNode(rootNode))

  // Apply layout
  const layout = new DagreLayout({
    type: 'dagre',
    rankdir: 'TB',
    align: undefined,
    ranksep: 50,
    nodesep: 50,
    controlPoints: true
  })

  const layoutData = layout.layout(graphData)
  
  // Update node positions from layout
  
  
  graph.fromJSON(layoutData);
  // Keep old logic for reference
  // props.data.forEach((rootNode, index) => {
  //   const startX = 300 + index * (NODE_WIDTH + VERTICAL_GAP)
  //   renderTree(graph, rootNode, undefined, startX, 50)
  // })

  // Center and fit content
  graph.centerContent()
  graph.zoomToFit({ padding: 20 })
}

// Initialize graph when component is mounted
onMounted(() => {
  initGraph()
})

// Clean up when component is unmounted
onUnmounted(() => {
  if (graphRef.value) {
    graphRef.value.dispose()
  }
})

// Watch for data changes and re-render
watch(
  () => props.data,
  () => {
    initGraph()
  },
  { deep: true, immediate: true }
)

// Watch for nodeStyle changes
watch(
  () => props.nodeStyle,
  () => {
    initGraph()
  },
  { deep: true }
)

// 处理右键菜单
const handleContextMenu = (e: MouseEvent, cell: any) => {
  e.preventDefault()
  contextMenuVisible.value = true
  contextMenuPosition.value = {
    left: `${e.clientX}px`,
    top: `${e.clientY}px`
  }
  selectedCell.value = cell
  selectedNode.value = cell.getData()
  console.log('selectedNodsafse', selectedNode.value)
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
// 关闭右键菜单
const closeContextMenu = () => {
  contextMenuVisible.value = false
}

// 处理编辑
const handleEdit = () => {
  isAddingNode.value = false
  sidebarVisible.value = true
  const parentNode = findNodeById(props.data, selectedNode.value.parentId)
  if (!!parentNode) {
    selectedNode.value.parentName = parentNode.name
  }
  closeContextMenu()
}

// 处理添加子节点
const handleAdd = () => {
  isAddingNode.value = true
  sidebarVisible.value = true
  selectedNode.value = {
    parentName: selectedNode.value.name,
    parentId: selectedNode.value.id,
  }
  closeContextMenu()
}

// 处理删除
const handleDelete = () => {
  if (!selectedNode.value || !selectedCell.value) return
  const data = JSON.parse(JSON.stringify(props.data))
  function deleteChildById(nodes: OrgNode[], childId: string): OrgNode[] {
    return nodes
      .map((node) => {
        if (node.id === childId) {
          return null
        }
        if (node.children) {
          node.children = node.children.filter((child) => child.id !== childId)
          node.children.forEach((child) => {
            if (child.children) {
              child.children = deleteChildById(child.children, childId)
            }
          })
        }
        return node
      })
      .filter(Boolean) as OrgNode[]
  }

  const newData = deleteChildById(data, selectedNode.value.id)
  closeContextMenu()
  emit('delete', selectedNode.value.id, newData)
}

// 关闭侧边栏
const closeSidebar = () => {
  sidebarVisible.value = false
  selectedNode.value = null
}

// 处理保存
const handleSave = (formData: Partial<OrgNode>) => {
  if (!selectedNode.value || !selectedCell.value) return
  if (isAddingNode.value) {
    console.log('add', formData, selectedNode.value.parentId)
    emit('add', formData, selectedNode.value.parentId)
  } else {
    // 更新现有节点
    emit('edit', formData, selectedNode.value.id)
  }
  closeSidebar()
}
</script>

<style scoped>
.chart-container {
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.container {
  position: relative;
}
</style>
