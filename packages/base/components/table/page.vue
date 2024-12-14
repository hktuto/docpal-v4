<script lang="ts" setup>

const { config}  = defineProps<{
    config: TableConfigWithPagerParams
}>()

const gridRef = ref()
const tableEvents: VxeGridListeners = {}
const gridConfig = ref<VxeGridProps>()

function generateTableConfig(){
    const {tableConfig} = createGridConfigWithPager(config)
    console.log('generateTableConfig', tableConfig)
    gridConfig.value = tableConfig
}

onMounted(() => {
    generateTableConfig()
})

</script>

<template>
    <div class="tableContainer">
        <vxe-grid
            v-if="gridConfig"
            ref="gridRef"
            v-bind="gridConfig"
            v-on="tableEvents"
        >
         <template #toolbar_buttons>
            
         </template>
         <template #action="{row, rowIndex}">

         </template>
        </vxe-grid>
    </div>
</template>

<style lang="scss" scoped>
.tableContainer{
    height: 100%;
    display: grid;
    grid-template-rows: 1fr min-content;
    gap: 0px;
    overflow: hidden;
}
.table{
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>