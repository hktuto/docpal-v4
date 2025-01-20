<template>
  <div :style="`--column-num: ${ dragHeader?.length || 2}`">
    <div class="header">
      <div class="handle"></div>
      <slot name="header">
        <div v-for="(item, index) in dragHeader" :key="item.name+index">
          {{ item.label }}</div>
      </slot>
      <div class="action"></div>
    </div>
    <draggable
      tag="ul"
      :list="list"
      class="list-group"
      handle=".handle"
      item-key="id"
      @end="handleDrag"
    >
      <template #item="{ element, index }">
        <li class="list-group-item">
          <el-icon class="handle"><Rank /></el-icon>
          <slot :item="element" :index="index">
            <div v-for="(item, index) in dragHeader" :key="item.name+index">
              {{ element[item.name] ? item.i18n ? $t(`${item.i18n}${element[item.name]}`) : element[item.name] : '-' }}
            </div>
          </slot>
          <div class="position-icon">
            <div v-if="element.require" class="color__danger" >*</div>
            <SvgIcon v-if="element.readOnly" src="/icons/eye.svg"></SvgIcon>
          </div>

          <div class="action flex-x-center" >
            <el-icon v-if="showEdit" class="cursorPointer el-icon--left" @click="handleOpenDialog(element)"><Edit /></el-icon>
            <el-icon class="cursorPointer" @click="removeAt(element, index)"><Delete /></el-icon>
          </div>
        </li>
      </template>
    </draggable>
    <el-button type="info" text @click="handleOpenDialog()">{{ $t('workflowEditor.addField') }}</el-button>
    <CmmnSidePanelDraggableDialog ref="dialogRef" :formJsonUrl="formJsonUrl"
      :node="node" :graph="graph" :filterList="props.list"
      @create="handleAdd"
      @edit="handleEdit"
      />
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { Rank, Edit, Delete } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'
const props = withDefaults(defineProps<{
  list: any,
  dragHeader: any,
  showEdit?: boolean,
  formJsonUrl: any,
  node?: any,
  graph?: any
}>(),{
  showEdit: true,
})

const emits = defineEmits(['change'])
const state = reactive<any>({
  curRow: null
})
async function removeAt(row, idx) {
  let hasContent = false
  Object.keys(row).forEach(key => {
    if(key !== 'id' && row[key]) hasContent = true
  });
  if(hasContent) {
    const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
  }
  props.list.splice(idx, 1);
  emits('change')
}
const dialogRef = ref()
function handleOpenDialog(row?: any) {
  if(!!row) state.curRow = row
  dialogRef.value.handleOpen(row)
}
function handleAdd(data) {
  props.list.push(data)
  emits('change')
}
function handleDrag(params:any) {
  emits('change')
}
function handleEdit(data: any) {
  Object.assign(state.curRow, data)
  emits('change')
}
</script>
<style scoped>
.list-group-item, .header {
  display: grid;
  grid-template-columns: min-content repeat(var(--column-num), 1fr) min-content;
  gap: var(--app-padding);
  align-items: center;
  margin-bottom: 4px;
  font-size: 0.8rem;
  .handle {
    width: 14px;
    cursor: move;
  }
  .action {
    width: 33px;
  }
}
.list-group {
  margin: unset;
  padding: unset
}
.list-group-item {
  position: relative;
  font-size: 1rem;
  line-height: 2.5rem;
}
.list-group-item + .list-group-item {
  border-top: 1px solid var(--color-grey-000);
}
.position-icon {
  position: absolute;
  left: 18px;
  top: 0;
  display: flex;
  align-items: center;
  line-height: 0;
  gap: 2px;
  --icon-color: #1995a0;
  --icon-size: 8px;
  :deep .svg-icon {
    margin-bottom: 4.8px;
  }
}
</style>
