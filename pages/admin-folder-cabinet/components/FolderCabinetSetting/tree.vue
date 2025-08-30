<template>
  <el-tree
    ref="treeRef"
    class="folder-tree"
    style="max-width: 600px"
    node-key="id"
    :data="[data]"
    :props="defaultProps"
    :icon="ArrowRight"
    :expand-on-click-node="false"
    :default-expand-all="true"
    :highlight-current="true"
    @current-change="handleCurrentChange"
  >
    <template #default="{ node, data }">
      <BrowseItemIcon class="file-icon el-icon--left" :type="data.folder ? 'folder' : 'file'" :fileName="data.label" />
      <div class="label ellipsis">{{ data.label }}</div>
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="$t('folder_cabinetDetailNewFileOrFolder')"
        placement="top"
      >
        <el-dropdown v-if="data.folder" trigger="click">
          <el-icon id="FolderCabinetSetting__Info__CreateNewFileOrFolder">
            <Plus/>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item id="FolderCabinetSetting__Info__CreateNewFile" @click="handleAdd(data, false)">
                {{ $t('folder_cabinetDetailNewFile') }}
              </el-dropdown-item>
              <el-dropdown-item id="FolderCabinetSetting__Info__CreateNewFolder__Submit" @click="handleAdd(data, true)">
                {{ $t('folderCabinet.addFolder') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>
    </template>
  </el-tree>
</template>
<script lang="ts" setup>
import {ArrowRight, Plus} from "@element-plus/icons-vue";

const props = defineProps(['data', 'id'])
const emits = defineEmits(['current-change'])
const handleAdd = inject('handleAddChild')
const defaultProps = {
  children: 'children',
  label: 'label',
}

function handleCurrentChange(row: any, node: any) {
  emits('current-change', row, node)
}

const treeRef = ref()

watch(() => props.data, (newValue) => {
  if (!!newValue) {
    setTimeout(() => {
      if (props.id) {
        treeRef.value.setCurrentKey(props.id)
        emits('current-change', treeRef.value.getCurrentNode())
      } else treeRef.value.setCurrentKey(newValue.id)
    }, 300)
  }
}, {
  immediate: true
})
defineExpose({treeRef})
</script>
<style lang="scss" scoped>
.el-tree {
  background-color: var(--color-b5);
  overflow: auto;
  // padding: var(--app-space-xs);
  & > :deep(.el-tree-node) {
    & > .el-tree-node__content {
      padding-left: 8px !important;
    }
  }
}

:deep(.el-tree-node__content) {
  padding: var(--app-space-xs) 4px;
  height: 42px;
  display: grid;
  grid-template-columns: min-content 1fr min-content min-content;
  grid-template-areas: "fileIcon label expandIcon addIcon";
  border-bottom: 1px solid #ddd;

  .file-icon {
    grid-area: fileIcon
  }

  .add-icon {
    grid-area: addIcon;
    --icon-size: 14px;
    font-weight: bold;
  }

  .label {
    grid-area: label;
  }

  .el-tree-node__expand-icon {
    grid-area: expandIcon;
  }
}
</style>
