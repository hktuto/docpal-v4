<template>
  <div class="import-detail-container">
    <el-form :model="job" label-position="top" label-width="100px">
      <el-form-item label="Profile Name" required>
        <el-input v-model="job.profileName" disabled />
      </el-form-item>
      <el-form-item label="Profile id">
        <el-input v-model="job.profileId" disabled />
      </el-form-item>
      <el-divider />
      <el-form-item label="File Name" required>
        <el-input v-model="job.fileName" disabled />
      </el-form-item>
      <el-form-item label="Activity">
        <div class="activity-log">
          <div v-for="(item, idx) in job.activityLog" :key="idx">
            <span>{{ formatDate(item.createdDate) }} {{ item.description }}</span>
            <span v-if="item.status === 'error'" style="color: red">{{ item.errorTip }}</span>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { adminApi } from 'api'
interface ActivityItem {
  createdDate: string
  description: string
  status?: 'error'
  errorTip?: string
}
const props = defineProps<{
  id: string
}>()
const job = ref<any>({
  profileName: '',
  profileId: '',
  fileName: '',
  activityLog: []
})
async function init(id: string) {
  try {
    job.value = await adminApi.api.getImportjobsId(id).then((res: any) => res.data)
  } catch (error) {
    job.value = {
      activityLog: []
    }
  }
}

onMounted(() => {
  init(props.id)
})
</script>

<style scoped>
.import-detail-container {
  padding: var(--app-space-s);
}

.activity-log {
  font-size: 14px;
  line-height: 1.8;
}
</style>
