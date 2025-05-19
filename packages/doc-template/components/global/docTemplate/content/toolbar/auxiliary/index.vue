<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const { editor, options, initEditor } = inject(DocTemplateProveKey)
const { t } = useI18n()

const state = reactive({
  fontLinkDialogVisible: false,
  link: ''
})

/**
 * Add horizontal
 */
function addHorizontalRule() {
  editor.value.chain().focus().setHorizontalRule().run()
}

function openSetLinkDialog() {
  state.fontLinkDialogVisible = true
  const href = editor.value.getAttributes('link').href
  if (href) {
    state.link = href
  } else {
    state.link = ''
  }
}

/**
 * Set the selected string to unset link
 */
function handleResetLink() {
  editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  state.fontLinkDialogVisible = false
}

/**
 * Set the selected string to link
 */
function handleSetLink() {
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: state.link }).run()
  state.fontLinkDialogVisible = false
}

/**
 * Set the selected string to task list
 */
function handleTaskList() {
  editor.value.chain().focus().toggleTaskList().run()
}

</script>

<template>
  <div>
    <el-button @click="addHorizontalRule">
      Horizontal line
    </el-button>

    <el-button @click="handleTaskList" :class="{ 'is-active': editor.isActive('taskList') }">
      Toggle task list
    </el-button>

    <!-- font link -->
    <el-button @click="openSetLinkDialog">
      <p>🔗</p>
    </el-button>
  </div>

  <div style="text-align: center; margin-top: 9px;">
    {{ t('Utils') }}
  </div>

  <el-dialog v-model="state.fontLinkDialogVisible" title="Set Link" width="500">
    <el-form>
      <el-form-item label="Link">
        <el-input v-model="state.link" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleResetLink">Reset</el-button>
        <el-button type="primary" @click="handleSetLink">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>