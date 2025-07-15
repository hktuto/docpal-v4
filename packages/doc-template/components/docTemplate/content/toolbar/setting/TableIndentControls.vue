<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject, reactive } from 'vue'
import VariableValueTable from '../../setting/variable/VariableValueTable.vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor } = provider
const { t } = useI18n()

const state = reactive({
  createTablePopoverVisible: false
})

/**
 * @param state boolean(true:indent,false:outdent)
 */
function handleIndent(state: boolean) {
  if (state) {
    editor.value.chain().focus().indent().run()
  } else {
    editor.value.chain().focus().outdent().run()
  }
}

const tableForm = reactive({
  value: {
    columns: [{ 'name': 'Column 1', 'align': 'left', 'color': '#d3dbde', 'width': '', 'key': 'Col_1' }],
    rows: [['']],
    bordered: true,
    striped: false,
    sort: 'Default',
    sortBy: true
  }
})

function handleCreateTable() {
  const { to } = editor.value.state.selection
  editor.value.commands.insertContent({
    type: 'variableTable',
    attrs: {
      type: 'table',
      value: tableForm.value
    }
  })
  editor.value.commands.focus(to + 1)
  state.createTablePopoverVisible = false
}
</script>

<template>
  <!-- table -->
  <el-button v-tooltip="t('docTemplate.table.createTable')" @click="state.createTablePopoverVisible = true"
             style="width:34px; margin-left: -6px">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <path fill="currentColor" fillRule="evenodd"
            d="M1.5 0A1.5 1.5 0 0 0 0 1.5v1.375h14V1.5A1.5 1.5 0 0 0 12.5 0zM0 8.375v-4.25h6.375v4.25zm0 1.25V12.5A1.5 1.5 0 0 0 1.5 14h4.875V9.625zm7.625 0V14H12.5a1.5 1.5 0 0 0 1.5-1.5V9.625zM14 8.375v-4.25H7.625v4.25z"
            clipRule="evenodd" />
    </svg>
  </el-button>

  <!--  Increase  -->
  <el-button v-tooltip="t('docTemplate.utils.increaseRight')" @click="handleIndent(true)" style="width:34px">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M13.5 1H.5m13 4H6m7.5 4H6m7.5 4H.5M2 5l2 2l-2 2" />
    </svg>
  </el-button>

  <el-button v-tooltip="t('docTemplate.utils.increaseLeft')" @click="handleIndent(false)"
             style="width:34px; margin-left: -6px">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M13.5 1H.5m13 4H6m7.5 4H6m7.5 4H.5m2-8L1 7l1.5 2" />
    </svg>
  </el-button>

  <!-- Create table dialog -->
  <el-dialog v-model="state.createTablePopoverVisible" :title="t(t('docTemplate.table.createTable'))">
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
