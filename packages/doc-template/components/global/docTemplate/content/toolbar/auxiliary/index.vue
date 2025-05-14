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

/**
 * Set the selected string to code
 */
function handleCode() {
  editor.value.chain().focus().toggleCode().run()
}

/**
 * Set the selected string to code block
 */
function handleCodeBlock() {
  editor.value.chain().focus().toggleCodeBlock().run()
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

function handleSetLink() {
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: state.link }).run()
  state.fontLinkDialogVisible = false
}

</script>

<template>
  <div>
    <el-button @click="addHorizontalRule">
      Horizontal line
    </el-button>
    
    <el-button @click="handleCode">
      Code
    </el-button>

    <!--  code block  -->
    <el-button @click="handleCodeBlock">
      Code block
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