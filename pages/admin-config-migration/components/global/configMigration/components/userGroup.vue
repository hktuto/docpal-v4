<script setup lang="ts">
import { adminApi } from 'api'

const props = defineProps<{
  userGroupList: any[]
}>()

async function handleCreateUserGroup() {
  const groupList: any = Object.values(props.userGroupList)
  let status = true
  const noAdditionsList: any[] = []

  for (const group of groupList) {
    const params = {
      groupId: group.id,
      groupName: group.name
    }
    try {
      await adminApi.api.postNuxeoIdentityGroup(params).then(r => r.data)
    } catch (e) {
      console.log('Create User Group', e)
      status = false
      noAdditionsList.push(group.name)
    }
  }
  return { status: status, message: noAdditionsList.join(',') }
}

defineExpose({
  handleCreateUserGroup
})
</script>

<template>
  <el-row :gutter="10">
    <template v-for="item in props.userGroupList" :key="item.key">
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
