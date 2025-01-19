<script lang="ts" setup>
const props = defineProps<{
    node: any,
    view: any,
}>()
const { graph, allNodeFlatMap } = useCmmnGraph()
const emits = defineEmits(['clicked'])
const connectionItem = ref<any[]>([]);

function calculateConnection(){
    const latestJson = graph.value.toJSON()
    const currentNodeConnectTo = latestJson.cells.reduce((all:string[], item: any) => {
        if( item.shape === 'edge' && item.source.cell === props.node.id ) {
            all.push(item.target.cell)
        }
        return all
    },[])
    connectionItem.value = latestJson.cells.filter((item: any) => {
        return !currentNodeConnectTo.includes(item.id) &&item.data.type === 'entryCriterion' || item.data.type === 'exitCriterion'
    })
}

function addConnection(item:any){
    graph.value.addEdge({
        shape: 'edge',
        source: {
            cell: props.node.id || ""
        },
        target: {
            cell: item.id,
            connectionPoint: {
                name: 'boundary',
                args: {
                    sticky: true,
                },
            },
        },
        data: {type: "edge"},
        router: {name: 'manhattan'},
        connector: {name: 'rounded'},
        attrs: {
            line: {
                stroke: 'var(--primary-color)',
            }
        },

    })
    // add 
    const targetNode = graph.value.getCellById(item.id)
    const sourceNode = graph.value.getCellById(props.node.id)
    if(!targetNode.data.sentry.data.planItemOnPart) {
        targetNode.data.sentry.data.planItemOnPart = {
        }
    }
    targetNode.data.sentry.data.planItemOnPart = {
        attr_sourceRef: sourceNode.data.planItem.attr_id,
        standardEvent: targetNode.data.type === 'entryCriterion' ? 'complete' : 'occur',
    }
    emits('clicked')
}

onMounted(() => {
    calculateConnection()
})

</script>

<template>
    <div class="actionItemGroup">
        
        <div class="connectionList">
            <div class="groupTitle">Connection</div>
            <div v-for="item in connectionItem" :key="item.id" class="item" @click="addConnection(item)">
                <template v-if="item.data && item.data.data && item.data.data.attr_name">

                    <SvgIcon :src="item.data.type === 'entryCriterion' ? '/cmmn/icon/entry-icon.svg' : '/cmmn/icon/exit-icon.svg'"></SvgIcon>
                    <div class="label">
                        {{item.data.data.attr_name}} on {{ item.data.planItem ?  item.data.planItem.attr_name : "Case" }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.groupTitle{
    font-size: 0.8rem;
}
.connectionList{
    display : flex;
    flex-flow: column nowrap;
    gap: calc( var(--app-padding) / 4 );
    max-height:200px;
    overflow: auto;
    .item{
        --icon-size: 14px;
        font-size: 1rem;
        padding: calc(var(--app-padding) / 2) var(--app-padding);
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-startx;
        align-items: center;
        gap: var(--app-padding);
        //border-bottom: 1px solid var(--color-grey-000);
        &:hover{
            background: var(--color-grey-000);
        }
    }
}
</style>