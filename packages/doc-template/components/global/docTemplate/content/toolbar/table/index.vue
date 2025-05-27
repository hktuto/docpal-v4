<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const { editor, options, initEditor } = inject(DocTemplateProveKey)
const { t } = useI18n()

const state = reactive({
  createTablePopoverVisible: false,
  tableRow: 3,
  tableCol: 3,
  withHeaderRow: ref(true)
})

function handlePopoverCreateTable() {
  handleCreateTable(state.tableRow, state.tableCol, state.withHeaderRow)
  state.createTablePopoverVisible = false
  state.tableRow = 3
  state.tableCol = 3
  state.withHeaderRow = true
}

function handleCreateTable(row: number, col: number, withHeaderRow: boolean) {
  editor.value.chain().focus().insertTable({ rows: row, cols: col, withHeaderRow: withHeaderRow }).run()
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

function handleClearBoundaries() {
  editor.value.commands.updateAttributes('table',{ border: '0'})
  // editor.value.commands.()
}

function handleShowBoundaries() {
  editor.value.commands.updateAttributes('table',{ border: '1'})
}

</script>

<template>
  <div>
    <el-popover :visible="state.createTablePopoverVisible" placement="bottom" :width="300" title="Create Table"
                trigger="click">
      <template #reference>
        <el-button style="margin-right: 16px" @click="state.createTablePopoverVisible = true">
          {{ $t('Create table') }}
        </el-button>
      </template>
      <el-form ref="createTableFormRef" label-position="left" label-width="auto">
        <el-form-item label="Row" prop="desc">
          <el-input v-model="state.tableRow" />
        </el-form-item>
        <el-form-item label="Col" prop="desc">
          <el-input v-model="state.tableCol" />
        </el-form-item>
        <el-form-item label="With Header Row" prop="delivery">
          <el-switch v-model="state.withHeaderRow" />
        </el-form-item>
        <div style="display: flex; justify-content: flex-end; margin: 0">
          <el-button @click="state.createTablePopoverVisible = false">
            Cancel
          </el-button>
          <el-button type="primary" @click="handlePopoverCreateTable">
            Create
          </el-button>
        </div>
      </el-form>
    </el-popover>

    <div>
      <el-button-group>
        <el-button @click="handleDeleteTable">
          {{ t('Delete table') }}
        </el-button>
        <el-button @click="handleTableDeleteRowOrCol(true)">
          {{ t('Delete Row') }}
        </el-button>
        <el-button @click="handleTableDeleteRowOrCol(false)">
          {{ t('Delete Col') }}
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button @click="handleTableCreateRow(true)">
          {{ t('Add row up') }}
        </el-button>
        <el-button @click="handleTableCreateRow(false)">
          {{ t('Add row down') }}
        </el-button>
      </el-button-group>

      <el-button-group>
        <el-button @click="handleTableCreateCol(true)">
          {{ t('Add col left') }}
        </el-button>
        <el-button @click="handleTableCreateCol(false)">
          {{ t('Add col right') }}
        </el-button>
      </el-button-group>
    </div>

    <div>
      <el-button-group>
        <el-button @click="handleTableToggleHeaderRowOrColumn(true)">
          Toggle header row
        </el-button>
        <el-button @click="handleTableToggleHeaderRowOrColumn(false)">
          Toggle header column
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleTableCellsMergeOrSplit(true)">
          Merge cells
        </el-button>
        <el-button @click="handleTableCellsMergeOrSplit(false)">
          Split cell
        </el-button>
      </el-button-group>
    </div>

    <!--    <el-button @click="handleFixTables">-->
    <!--      Fix-->
    <!--    </el-button>-->

    <el-button @click="handleClearBoundaries">
      Clear boundaries
    </el-button>

    <el-button @click="handleShowBoundaries">
      Show boundaries
    </el-button>

  </div>

  <div style="text-align: center; margin-top: 9px;">
    {{ t('Table') }}
  </div>
</template>

<style scoped lang="scss">

</style>