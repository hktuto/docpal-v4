<script lang="ts" setup>
const {flatRole} = useRBAC()
const props = defineProps<{
  permission:any
}>()

function getData(){
  return []
}

function createColumn(){
  
}

const {tableConfig, tableEvent, tableRef, reload} = useVxeTable({
  id: "userMiniTable",
  api: async () => {
    return getData()
  },
  remoteSort: false,
  remoteFilter: false,
  virtualScroll: true,
  saveColumnOrder: false,
  zoom:false,
  columns: [
    {
      title: "",
    },
    {
      title: "Read",
    },
    {
      title: "Edit",
    },
    {
      title: "Print",
    },    
    {
      title: "Delete",
    },
    {
      title: "Manage",
    }
  ],
})

onMounted(() => {

})



</script>


<template>
  <div class="tableContainer">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <slot name="toolbar_buttons" />
      </template>
      <template #toolbarTools>
        
        <slot name="toolbarTools" />
      </template>
     
    </VxeGrid>
  </div>
</template>


<style lang="scss" scoped>
.tableContainer {
  width:100%;
  height: 600px;
  overflow: hidden;
  position: relative;
}
</style>
