<script setup lang="ts">
import { adminApi } from 'api'

const props = defineProps<{
  emailTemplateList: any[]
}>()

function handleEditEmailTemplate(item: any) {
  console.log('item', item)
}

async function handleCreateEmailTemplate() {
  let status = true
  const list: any[] = []

  for (const item of Object.values(props.emailTemplateList)) {
    try {
      const res = await adminApi.api.postTemplateEmailTemplate({
        subject: item.subject,
        body: item.body,
        emailLayoutId: item.emailLayoutId,
        emailTemplateJson: item.emailTemplateJson,
        emailTemplateVariable: item.emailTemplateVariable,
        label: item.label
      }).then(res => res.data)
    } catch (e) {
      status = false
      list.push(item.name)
    }
  }
  return { status: status, message: list.join(',') }
}

defineExpose({
  handleCreateEmailTemplate
})

</script>

<template>
  <el-row :gutter="10">
    <template v-for="item in props.emailTemplateList" :key="item.key">
      <el-col :span="4">
        <el-card style="max-height: 100px;">
          <div class="card-header" @dblclick="handleEditEmailTemplate(item)">
            <h4>{{ item.id }}</h4>
          </div>
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
