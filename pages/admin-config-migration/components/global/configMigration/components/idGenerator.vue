<script setup lang="ts">
const props = defineProps<{
  idGeneratorList: any[]
}>()
</script>

<template>
  <el-row :gutter="10">
    <template v-for="item in props.idGeneratorList" :key="item.key">
      <el-col :span="4">
        <el-card style="max-height: 600px;">
          <template #header>
            <div class="card-header">
              <h4>{{ item.name }}</h4>
            </div>
          </template>
          <el-descriptions :column="1">
            <el-descriptions-item label="Prefix:">
              <el-tag v-for="prefixItem in item.prefix" size="small">
                {{ prefixItem.expression }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Suffix:">
              <el-tag v-for="prefixItem in item.suffix" size="small">
                {{ prefixItem.expression }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="ID digit:">{{ item.idDigit }}</el-descriptions-item>
            <el-descriptions-item label="Starting Number:">{{ item.startNumber }}</el-descriptions-item>
          </el-descriptions>
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
