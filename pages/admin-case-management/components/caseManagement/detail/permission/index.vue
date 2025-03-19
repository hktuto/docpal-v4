<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span style="font-size: 18px;">{{ $t('caseManagement_detailPermission') }}</span>
      </div>
    </template>
    <div class="permissionItemContainer">
      <CaseManagementDetailPermissionCard v-for="(item, index) in state.groups" :key="index" :data="item"
                                          :caseInformation="state.caseInformation"
                                          @refresh="(data) => handleRefresh(data, index)"
                                          @delete="handleDelete"/>
    </div>
    <el-button id="adminCaseManagementDetailAddPermission" type="primary" text @click="handleAdd()">
      {{ $t('caseManagement.addPermission') }}
    </el-button>
    <CaseManagementDetailPermissionDialog ref="dialogRef" :caseInformation="state.caseInformation"
                                          @refresh="handleRefresh"
    />
  </el-card>
</template>
<script lang="ts" setup>
const props = defineProps(['node'])
const emits = defineEmits(['save'])
const state = reactive<any>({
  groups: [],
  caseInformation: []
})
// #region module:
const dialogRef = ref()

function handleAdd() {
  dialogRef.value.handleOpen()
}

// #endregion
function init(nodeData: any) {
  const permission = getExtentionProperties(nodeData.data.casePlanModel, 'docpal:attributes')
  const filter = getExtentionProperties(nodeData.data.casePlanModel, 'docpal:data_filter')

  state.caseInformation = getExtentionProperties(nodeData.data.casePlanModel, 'docpal:form')
  if (!state.caseInformation) state.caseInformation = []
  permission.forEach(item => {
    let index = state.groups.findIndex(g => g.name === item.group)
    if (index === -1) {
      state.groups.push({
        name: item.group
      })
      index = state.groups.length - 1
    }
    state.groups[index].permission = getWholePermissionField(item)
  })
  filter.forEach(item => {
    let index = state.groups.findIndex(g => g.name === item.group)
    if (index === -1) {
      state.groups.push({
        name: item.group
      })
      index = state.groups.length - 1
    }
    state.groups[index].filter = getWholeFilter(item)
  })
}

function getWholePermissionField(permission) {
  try {
    state.caseInformation.forEach(item => {
      const isExist = permission.field.find(p => p.id === item.id)
      if (!isExist) permission.field.push({
        accesstype: 'hidden',
        id: item.id
      })
    })
    permission.field = permission.field.filter(item => state.caseInformation.find(c => c.id === item.id))
  } catch (error) {
  } finally {
    return permission
  }
}

function getWholeFilter(filter) {
  try {
    filter.filed_condition = filter.filed_condition.filter(item => state.caseInformation.find(c => c.id === item.id))
  } catch (error) {
  } finally {
    return filter
  }
}

function handleSave(attributes, filters) {
  const nodeData = props.node.data
  updateExtentionProperties(nodeData.data.casePlanModel, 'docpal:attributes', attributes, props.node.id)
  updateExtentionProperties(nodeData.data.casePlanModel, 'docpal:data_filter', filters, props.node.id)
  emits('save')
}

function handleDelete(data) {
  const index = state.groups.findIndex(item => item.name === data.name)
  state.groups.splice(index, 1)
  const _data = [...state.groups]

  handleSave(_data.map(item => ({
    ...item.permission,
    group: item.name
  })), _data.map(item => ({
    ...item.filter,
    group: item.name
  })))
}

function handleRefresh(data, index) {
  // const index = state.groups.findIndex(item => item.name === data.name)
  if (index || index === 0) {
    state.groups[index] = data
  } else {
    state.groups.push(data)
  }
  const _data = [...state.groups]
  handleSave(_data.map(item => ({
    ...item.permission,
    casetable: props.node.id,
    group: item.name
  })), _data.map(item => ({
    ...item.filter,
    casetable: props.node.id,
    group: item.name
  })))
}

defineExpose({init})
</script>


<style lang="scss" scoped>
.permissionCard {
  background: var(--app-grey-950);
  padding: var(--app-space-xs);
  color: var(--app-grey-300);
  border-radius: calc(var(--app-space-xs) / 3);
  // width: 200px;
  .title {
    font-weight: bold;
  }
}

.permissionItemContainer {
  width: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-template-rows: masonry;
  gap: var(--app-space-xs);

}
</style>
