<script setup lang="ts">
const props = defineProps<{
  caseList: any
}>()

function handleCaseFieldsShow(xml: string) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'application/xml')
  // update case fields
}

function handleEditCaseDashboardItem(dashboardItem: any) {
  console.log('DashboardItem', dashboardItem)
  // update case dashboard permissions
}

</script>

<template>
  <el-row :gutter="1">
    <template v-for="item in props.caseList" :key="item.key">
      <el-col :span="4">
        <el-card style="max-height: 400px;">
          <template #header>
            <div class="card-header">
              <h4>{{ item.name }}</h4>
            </div>
          </template>
          <span>Case Fields</span>
          <div>
            <div v-for="fieldsItem in handleCaseFieldsShow(item.xml)">
              {{ fieldsItem.name }} - {{ fieldsItem.type }}
            </div>
          </div>
          <el-divider />
          <span>Case Dashboard</span>
          <div v-for="dashboardItem in item.dashboard" style="max-height: 100px">
            <el-row>
              <el-col :span="8">
                <div style="background-color: #C0C6C8CC" @dblclick="handleEditCaseDashboardItem(dashboardItem)">
                  {{ dashboardItem.label }}
                </div>
              </el-col>
            </el-row>
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

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
