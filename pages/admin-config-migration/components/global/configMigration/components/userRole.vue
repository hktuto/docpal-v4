<script setup lang="ts">
import { adminApi } from 'api'

const props = defineProps<{
  userRoleList: any[]
}>()

async function handleCreateUserRole() {
  const roleList: any = Object.values(props.userRoleList)
  let status = true
  const noAdditionsList: any[] = []

  for (const role of roleList) {
    const params = {
      name: role.name,
      status: role.status,
      type: role.status
    }
    try {
      const newVar = await adminApi.api.postAclRole(params).then(r => r.data)
    } catch (e) {
      status = false
      noAdditionsList.push({ name: role.name, newId: newVar.id })
    }
  }
  return { status: status, data: noAdditionsList }
}

defineExpose({ handleCreateUserRole })
</script>

<template>
  <el-row :gutter="10">
    <template v-for="item in props.userRoleList" :key="item.key">
      <el-col :span="4">
        <el-card style="max-height: 100px;">
          <div class="card-header">
            <h4>{{ item.name }}</h4>
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
