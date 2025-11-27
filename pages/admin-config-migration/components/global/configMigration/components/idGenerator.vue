<script setup lang="ts">
import { adminApi } from 'api'

const props = defineProps<{
  idGeneratorList: any[]
}>()

async function handleCreateIdGenerator() {
  const idGeneratorList: any = Object.values(props.idGeneratorList)
  let status = true
  const list: any[] = []

  for (const idTemplateItem of idGeneratorList) {
    let data
    // create
    try {
      data = await adminApi.api.postIdTemplates({ name: idTemplateItem.name }).then(res => res.data)
    } catch (e) {
      status = false
      list.push(idTemplateItem.name)
      continue
    }

    if (!data || !data.id) {
      status = false
      list.push(idTemplateItem.name)
      continue
    }

    const form = {
      id: data.id,
      prefix: idTemplateItem.prefix,
      suffix: idTemplateItem.suffix,
      idDigit: idTemplateItem.idDigit,
      startNumber: idTemplateItem.startNumber
    }
    try {
      await adminApi.api.putIdTemplatesId(data.id, form).then(res => res.data)
    } catch (e) {
      status = false
      list.push(idTemplateItem.name)
    }
  }

  return { status: status, message: list.join(',') }
}

defineExpose({
  handleCreateIdGenerator
})

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
.el-col {
  padding-block: 2px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>
