<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const { editor, options } = inject(DocTemplateProveKey)
const { t } = useI18n()
const fontPredefineBackgroundColors = ref(['#FFFFFF', '#97FC00', '#00DDFF'])
const fontPredefineThBackgroundColors = ref(['#ADADAD', '#fc8f00', '#00b2ff'])

const state = reactive({
  createTablePopoverVisible: false,
  tableRow: 3,
  tableCol: 3,
  withHeaderRow: ref(true),
  tableBackgroundColor: '#FFFFFF',
  tableThBackgroundColor: '#ADADAD'
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
      <el-popover :visible="state.createTablePopoverVisible" placement="bottom" :width="300" :title="t('Create Table')"
                  trigger="click">
        <template #reference>
          <el-button @click="state.createTablePopoverVisible = true">
            {{ $t('Create Table') }}
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
              {{ $t('Cancel') }}
            </el-button>
            <el-button type="primary" @click="handlePopoverCreateTable">
              {{ $t('Create') }}
            </el-button>
          </div>
        </el-form>
      </el-popover>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleTableCreateRow(true)">
          {{ $t('Add Row Up') }}
        </el-button>
        <el-button @click="handleTableCreateRow(false)">
          {{ $t('Add Row Down') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleTableCreateCol(true)">
          {{ $t('Add col left') }}
        </el-button>
        <el-button @click="handleTableCreateCol(false)">
          {{ $t('Add col right') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleDeleteTable">
          {{ $t('Delete table') }}
        </el-button>
        <el-button @click="handleTableDeleteRowOrCol(true)">
          {{ $t('Delete Row') }}
        </el-button>
        <el-button @click="handleTableDeleteRowOrCol(false)">
          {{ $t('Delete Col') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleTableCellsMergeOrSplit(true)">
          {{ $t('Merge cells') }}
        </el-button>
        <el-button @click="handleTableCellsMergeOrSplit(false)">
          {{ $t('Split cell') }}
        </el-button>
      </el-button-group>


      <el-divider direction="vertical" />
      <el-button-group>
        <el-button @click="handleBackgroundColor(state.tableBackgroundColor)">
          {{ $t('Set Table Background Color') }}
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
          {{ $t('Toggle header row') }}
        </el-button>
        <el-button @click="handleTableToggleHeaderRowOrColumn(false)">
          {{ $t('Toggle header column') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleThBackgroundColor(state.tableThBackgroundColor)">
          {{ $t('Set Header Background Color') }}
        </el-button>

        <el-button style="width: 22px;">
          <el-color-picker v-model="state.tableThBackgroundColor" :predefine="fontPredefineThBackgroundColors"
                           @blur="handleThBackgroundColor(state.tableThBackgroundColor)" />
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleClearOuterBoundaries">
          {{ $t('Clear Outer Boundaries') }}
        </el-button>

        <el-button @click="handleShowOuterBoundaries">
          {{ $t('Show Outer Boundaries') }}
        </el-button>
      </el-button-group>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-button @click="handleClearInnerBoundaries">
          {{ $t('Clear Inner Boundaries') }}
        </el-button>

        <el-button @click="handleShowInnerBoundaries">
          {{ $t('Show Inner Boundaries') }}
        </el-button>
      </el-button-group>
    </el-col>

    <el-col :span="24">
      <!--    <el-button @click="handleFixTables">-->
      <!--      Fix-->
      <!--    </el-button>-->
    </el-col>
  </el-row>

  <div style="text-align: center; margin-top: 9px;">
    {{ $t('Table') }}
  </div>
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