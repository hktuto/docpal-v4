<script setup lang="ts">
const props = defineProps<{
  documentTemplateList: any[]
}>()

function handleEditDocumentTemplate(item: any) {
  console.log('item', item)
}
</script>

<template>
  <el-row :gutter="10">
    <template v-for="item in props.documentTemplateList" :key="item.key">
      <el-col :span="4">
        <el-card style="max-height: 100px;">
          <div class="card-header" @dblclick="handleEditDocumentTemplate(item)">
            <h4>{{ item.name }}</h4>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<style scoped lang="scss">
.el-col{
  padding-block: 2px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>
