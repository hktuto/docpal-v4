<template>
<div class="pageContainer">
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent" >
    <template #toolbar_buttons>

    </template>
  </VxeGrid>
</div>
</template>

<script lang="ts" setup>
import { adminApi } from 'api'

const conditions = reactive([])

const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id:'userGroupList',
  api: async( params:any )=>{
    const res = await adminApi.api.postAclRolePage({},{
      body:{
        ...params,
        conditions: [
          {
            column:'type',
            type: 'EQ',
            values: "2"
          },
          ...conditions
        ]
      }
    })
    return res
  },
  columns:[]
})

</script>

<style lang="scss" scoped>
.pageContainer{
  height: 100%;
  width: 100%;
  padding: var(--app-spacing-s);
}
</style>
