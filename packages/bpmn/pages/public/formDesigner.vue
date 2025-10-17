<script lang="ts" setup>
const workflowFieldList: any = ref({
  labelKey: 'name',
  nameKey: 'id',
  data: []
})

const FormDesignRef = ref()

defineExpose({})
</script>

<template>
  <div class="pageContainer">
    <FormDesigner ref="FormDesignRef" :fieldListApi="workflowFieldList"> </FormDesigner>
  </div>
</template>
<style lang="scss" scoped>
.pageContainer{
  height: 100vh;
  width: 100%;
  padding: var(--app-space-s);
  overflow: hidden;
  position: relative;
}
</style>
