<script lang="ts" setup>
import { Graph } from '@antv/x6'
import type { Node } from '@antv/x6'
import { DagreLayout } from '@antv/layout'
import { useRoleList } from '~/composables/useRBAC'

const graph = ref<Graph>()
const { options = {} } = defineProps<{
  options?: any
}>()
const containerEl = ref()

const emits = defineEmits(['graphReady'])

function initGraph() {
  if (graph.value) {
    graph.value.dispose()
  }
  const graphOptions = Object.assign(
    {
      container: containerEl.value,
      interacting: true,
      grid: {
        visible: true,
        type: 'mesh',
        args: {
          color: '#eee',
          thickness: 1
        }
      },
      scaling: {
        min: 0.01,
        max: 2
      },
      background: {
        color: 'var(--app-grey-9000)'
      },
      autoResize: true,
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel']
      },
      embedding: {
        enabled: false
      },
      mousewheel: {
        enabled: true,
        factor: 1.05,
        modifiers: ['ctrl', 'meta']
      },
      connecting: {
        connector: 'rounded',
        allowMulti: false
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 3,
            attrs: {
              strokeWidth: 3,
              stroke: '#c41a1a'
            }
          }
        }
      }
    },
    options
  )
  graph.value = new Graph({
    container: containerEl,
    ...graphOptions
  })

  const roles = useRoleList()
  const x6Json = initMap(roles.value)
  const layout = new DagreLayout({
    // @ts-ignore
    type: 'dagre',
    rankdir: 'TB',
    ranksep: 40,
    nodesep: 40
  })
  // @ts-ignore
  const position = layout.layout(x6Json)
  graph.value?.fromJSON(position)
  emits('graphReady')
}

function initMap(
  root: any,
  parent?: string,
  x6Json: any = {
    nodes: [],
    edges: []
  }
) {
  if (Array.isArray(root)) {
    root.forEach((item: any) => {
      x6Json = initMap(item, parent, x6Json)
    })
    return x6Json
  }
  const node = {
    width: 200,
    height: 64,
    id: parent ? parent.replaceAll(' ', '') + '_' + root.label : root.label,
    label: root.label,
    shape: 'rect',
    data: {
      ...root
    },
    attrs: {
      body: {
        stroke: '#ddd',
        strokeWidth: 1,
        fill: '#fff',
        rx: 8,
        ry: 8,
        refWidth: 1,
        refHeight: 1,
        filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))'
      },
      title: {
        text: root.label,
        refX: 46,
        refY: 12,
        fill: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        'text-anchor': 'start'
      },
      text: {
        refX: 46,
        refY: 30,
        fontSize: 12,
        fill: '#000',
        textAnchor: 'start',
        textVerticalAnchor: 'top',
        textWrap: {
          width: -52, // 宽度减少 10px
          height: '70%', // 高度减少 10px
          ellipsis: true, // 文本超出显示范围时，自动添加省略号
          breakWord: false // 是否截断单词
        }
      }
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body'
      },
      {
        tagName: 'text',
        selector: 'title'
      },
      {
        tagName: 'text',
        selector: 'text'
      }
    ],
    ports: {
      groups: {
        from: {
          position: 'top',
          attrs: {
            circle: {
              magnet: true,
              stroke: 'transparent',
              fill: 'transparent',
              r: 5
            }
          }
        },
        to: {
          position: 'bottom',
          attrs: {
            circle: {
              magnet: true,
              stroke: 'transparent',
              fill: 'transparent',
              r: 5
            }
          }
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              magnet: true,
              stroke: 'transparent',
              fill: 'transparent',
              r: 5
            }
          }
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              magnet: true,
              stroke: 'transparent',
              fill: 'transparent',
              r: 5
            }
          }
        }
      }
    }
  }
  x6Json.nodes.push(node)
  if (parent) {
    // create edge
    const edge = {
      id: root.label + '_' + parent,
      label: '',
      source: { cell: parent, port: 'bottom' },
      target: { cell: node.id, port: 'top' },
      connector: {
        name: 'rounded',
        args: {
          radius: 20
        }
      },
      router: 'manhattan',
      data: {
        type: 'linkToBoundary',
        attachedToRef: parent
      }
    }
    x6Json.edges.push(edge)
  }
  if (root.child) {
    for (let child of root.child) {
      x6Json = initMap(child, node.id, x6Json)
    }
  }
  return x6Json
}

defineExpose({
  initGraph
})

provide('rbacGraph', {
  graph
})
</script>

<template>
  <div class="graphContainer">
    <div ref="containerEl" class="graphElement"></div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.graphContainer {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  overflow: hidden;
  > .graphElement {
    width: 100%;
    height: 100%;
  }
}
</style>
