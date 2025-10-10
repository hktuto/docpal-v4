<template>
  <div :style="`--show-drag: ${showDrag ? 'min-content' : ''}; --column-num: ${ dragHeader?.length || 2}`">
    <div class="header">
      <div v-if="showDrag" class="handle"></div>
      <slot name="header">
        <div v-for="(item, index) in dragHeader" :key="item.name+index">
          {{ item.label }}
        </div>
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
          <el-icon v-if="showDrag" class="handle">
            <Rank/>
          </el-icon>
          <slot :item="element" :index="index">
            <div v-for="(item, index) in dragHeader" :key="item.name+index">
              {{ element[item.name] ? item.i18n ? $t(`${item.i18n}${element[item.name]}`) : element[item.name] : '-' }}
            </div>
          </slot>
          <div class="position-icon">
            <div v-if="element.require" class="color__danger">*</div>
            <Icon v-if="element.readOnly" name="mdi:eye"/>
          </div>

          <div class="action flex-x-center">
            <el-icon v-if="showEdit" class="cursorPointer el-icon--left" @click="handleOpenDialog(element)">
              <Edit/>
            </el-icon>
            <el-icon class="cursorPointer" @click="removeAt(element, index)">
              <Delete/>
            </el-icon>
          </div>
        </li>
      </template>
    </draggable>
    <div>
      <el-button id="EasyForm__Detail__FormInformation__AddField" type="primary" @click="handleOpenDialog()">
        {{ $t('workflowEditor.addField') }}
      </el-button>
    </div>
    <EasyFormDraggableDialog ref="dialogRef" :formJsonUrl="formJsonUrl"
                             :filterList="list"
                             :options="options"
                             @create="handleAdd"
                             @edit="handleEdit"
    />
  </div>
</template>

<script lang="ts" setup>
import {ElMessageBox} from 'element-plus'
import {Delete, Edit, Rank} from '@element-plus/icons-vue'
import draggable from 'vuedraggable'

const props = withDefaults(defineProps<{
  list: any,
  options: any,
  dragHeader: any,
  showEdit: boolean,
  showDrag: boolean,
  formJsonUrl: string,
}>(), {
  showDrag: true,
  showEdit: true,
  formJsonUrl: 'cmmn/field.json'
})
const {t} = useI18n()
const emits = defineEmits(['change'])
const state = reactive<any>({
  curRow: null
})

async function removeAt(row, idx) {
  let hasContent = false
  Object.keys(row).forEach(key => {
    if (key !== 'id' && row[key]) hasContent = true
  });
  if (hasContent) {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`).catch(action => action)
    if (action !== 'confirm') return
  }
  props.list.splice(idx, 1);
  emits('change')
}

const dialogRef = ref()

function handleOpenDialog(row: any) {
  if (!!row) state.curRow = row
  dialogRef.value.handleOpen(row)
}

function handleAdd(data) {
  props.list.push(data)
  emits('change')
}

function handleDrag(params: any) {
  emits('change')
}

function handleEdit(data: any) {
  Object.assign(state.curRow, data)
  emits('change')
}
</script>
<style scoped>
.header {
  font-size: 0.8rem;
  color: var(--app-grey-9500);
}

.list-group-item, .header {
  display: grid;
  grid-template-columns: var(--show-drag) repeat(var(--column-num), 1fr) min-content;
  gap: var(--app-space-xs);
  align-items: center;

  .handle {
    width: 14px;
    cursor: move;
  }

  .action {
    width: 33px;
  }

}

.list-group-item {
  padding: calc(var(--app-space-xs) / 2) calc(var(--app-space-xs) / 2);

  + .list-group-item {
    border-top: 1px solid var(--app-grey-900);
  }

  &:nth-child(odd) {
    background: var(--app-grey-000);
  }

  &:last-child {
    border-bottom: 1px solid var(--app-grey-900);
  }
}

.list-group {
  margin: unset;
  padding: unset
}

.list-group-item {
  position: relative;
  line-height: 24px;
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

  :deep(.svg-icon ){
    margin-bottom: 4.8px;
  }
}

.flex-x-center {
  display: flex;
  align-items: center;
}
</style>
