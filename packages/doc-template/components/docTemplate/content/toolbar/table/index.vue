<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import VariableValueTable from '../../setting/variable/VariableValueTable.vue'

const { editor, options } = inject(DocTemplateProveKey)
const { t } = useI18n()
const fontPredefineBackgroundColors = ref(['#FFFFFF', '#97FC00', '#00DDFF'])
const fontPredefineThBackgroundColors = ref(['#ADADAD', '#fc8f00', '#00b2ff'])

const state = reactive({
  createTablePopoverVisible: false,
  tableBackgroundColor: '#FFFFFF',
  tableThBackgroundColor: '#ADADAD'
})

const tableForm = reactive({
  value: {
    columns: [{ 'name': 'Column 1', 'align': 'left', 'color': '#d3dbde', 'width': '', 'key': 'Col_1' }],
    rows: [['']],
    bordered: true,
    striped: false
  }
})

function handleCreateTable() {
  editor.value.commands.insertContent({
    type: 'variableTable',
    attrs: {
      type: 'table',
      value: tableForm.value
    }
  })
  state.createTablePopoverVisible = false
}

function handleDeleteTable() {
  editor.value.chain().focus().deleteTable().run()
}

/**
 * @param state (true: up, false: down)
 */
function handleTableCreateRow(state: boolean) {
  if (state) {
    editor.value.chain().focus().addRowBefore().run()
  } else {
    editor.value.chain().focus().addRowAfter().run()
  }
}

/**
 * @param state (true: row, false: col)
 */
function handleTableDeleteRowOrCol(state: boolean) {
  if (state) {
    editor.value.chain().focus().deleteRow().run()
  } else {
    editor.value.chain().focus().deleteColumn().run()
  }
}

/**
 * @param state (true: left, false: right)
 */
function handleTableCreateCol(state: boolean) {
  if (state) {
    editor.value.chain().focus().addColumnBefore().run()
  } else {
    editor.value.chain().focus().addColumnAfter().run()
  }
}

/**
 * @param state (true: row, false: col)
 */
function handleTableToggleHeaderRowOrColumn(state: boolean) {
  if (state) {
    editor.value.chain().focus().toggleHeaderRow().run()
  } else {
    editor.value.chain().focus().toggleHeaderColumn().run()
  }
}

function handleThBackgroundColor(backgroundColor: string) {
  editor.value.chain().focus().setCellAttribute('thBackgroundColor', backgroundColor).run()
}

/**
 * @param state (true: merge, false: split)
 */
function handleTableCellsMergeOrSplit(state: boolean) {
  if (state) {
    editor.value.chain().focus().mergeCells().run()
  } else {
    editor.value.chain().focus().splitCell().run()
  }
}

function handleFixTables() {
  editor.value.chain().focus().fixTables().run()
}

function handleClearOuterBoundaries() {
  editor.value.commands.updateAttributes('table', { border: '0' })
}

function handleShowOuterBoundaries() {
  editor.value.commands.updateAttributes('table', { border: '1' })
}

function handleClearInnerBoundaries() {
  editor.value.chain().focus().setCellAttribute('border', 'none;').run()
  // TODO: style Not effective
  // editor.value.chain().focus().setCellAttribute('borderBottom', 'none;').run()
  // editor.value.chain().focus().setCellAttribute('borderTop', 'none;').run()
  // editor.value.chain().focus().setCellAttribute('borderLeft', 'none;').run()
  // editor.value.chain().focus().setCellAttribute('borderRight', 'none;').run()
}

function handleShowInnerBoundaries() {
  editor.value.chain().focus().setCellAttribute('border', '1px solid black;').run()
  // TODO: style Not effective
  // editor.value.chain().focus().setCellAttribute('borderBottom', '1px solid black;').run()
  // editor.value.chain().focus().setCellAttribute('borderTop', '1px solid black;').run()
  // editor.value.chain().focus().setCellAttribute('borderLeft', '1px solid black;').run()
  // editor.value.chain().focus().setCellAttribute('borderRight', '1px solid black;').run()
}

function handleBackgroundColor(backgroundColor: string) {
  editor.value.chain().focus().setCellAttribute('backgroundColor', backgroundColor).run()
}

</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-button @click="state.createTablePopoverVisible = true">
        {{ $t('docTemplate.table.createTable') }}
      </el-button>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleTableCreateRow(true)">
          {{ $t('docTemplate.table.addRowUp') }}
        </el-button>
        <el-button @click="handleTableCreateRow(false)">
          {{ $t('docTemplate.table.addRowDown') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleTableCreateCol(true)">
          {{ $t('docTemplate.table.addColLeft') }}
        </el-button>
        <el-button @click="handleTableCreateCol(false)">
          {{ $t('docTemplate.table.addColRight') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleDeleteTable">
          {{ $t('docTemplate.table.delete') }}
        </el-button>
        <el-button @click="handleTableDeleteRowOrCol(true)">
          {{ $t('docTemplate.table.deleteRow') }}
        </el-button>
        <el-button @click="handleTableDeleteRowOrCol(false)">
          {{ $t('docTemplate.table.deleteCol') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleTableCellsMergeOrSplit(true)">
          {{ $t('docTemplate.table.MergeCells') }}
        </el-button>
        <el-button @click="handleTableCellsMergeOrSplit(false)">
          {{ $t('docTemplate.table.SplitCell') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />
      <el-button-group>
        <el-button @click="handleBackgroundColor(state.tableBackgroundColor)">
          {{ $t('docTemplate.table.cellBackgroundColor') }}
        </el-button>
        <el-button style="width: 22px;">
          <el-color-picker v-model="state.tableBackgroundColor" :predefine="fontPredefineBackgroundColors"
                           @blur="handleBackgroundColor(state.tableBackgroundColor)" />
        </el-button>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <el-button-group>
        <el-button @click="handleTableToggleHeaderRowOrColumn(true)">
          {{ $t('docTemplate.table.toggleHeaderRow') }}
        </el-button>
        <el-button @click="handleTableToggleHeaderRowOrColumn(false)">
          {{ $t('docTemplate.table.toggleHeaderColumn') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleThBackgroundColor(state.tableThBackgroundColor)">
          {{ $t('docTemplate.table.setHeaderBackgroundColor') }}
        </el-button>

        <el-button style="width: 22px;">
          <el-color-picker v-model="state.tableThBackgroundColor" :predefine="fontPredefineThBackgroundColors"
                           @blur="handleThBackgroundColor(state.tableThBackgroundColor)" />
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleClearOuterBoundaries">
          {{ $t('docTemplate.table.clearingOuterBoundaries') }}
        </el-button>

        <el-button @click="handleShowOuterBoundaries">
          {{ $t('docTemplate.table.showOuterBoundaries') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleClearInnerBoundaries">
          {{ $t('docTemplate.table.clearingInnerBoundaries') }}
        </el-button>

        <el-button @click="handleShowInnerBoundaries">
          {{ $t('docTemplate.table.showInnerBoundaries') }}
        </el-button>
      </el-button-group>
    </el-col>
  </el-row>

  <div style="text-align: center; margin-top: 9px;">
    {{ $t('Table') }}
  </div>

  <!-- Create table dialog -->
  <el-dialog v-model="state.createTablePopoverVisible" :title="t('Create Table')">
    <VariableValueTable v-model="tableForm.value">
      {{ tableForm.value }}
    </VariableValueTable>
    <template #footer>
      <el-button @click="state.createTablePopoverVisible = false">
        {{ $t('vxe.button.cancel') }}
      </el-button>
      <el-button type="primary" @click="handleCreateTable">
        {{ $t('docTemplate.table.create') }}
      </el-button>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 10px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 2px;
}

</style>
