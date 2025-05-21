<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor, lastSelection } = editorProvider

const state = reactive({
  imagePopoverVisible: false,
  width: 100,
  height: 100
})

</script>

<template>
  <bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 500 }"
    v-if="editor"
    style="width: auto"
  >
    <div class="bubble-menu">
      <button v-if="lastSelection?.type == 'text'" @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor.isActive('bold') }">
        Bold
      </button>
      <button v-if="lastSelection?.type == 'text'" @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      <!--  font Underline  -->
      <button v-if="lastSelection?.type == 'text'" @click="editor.chain().focus().toggleUnderline().run()"
              :class="{ 'is-active': editor.isActive('underline') }">
        Underline
      </button>
      <!--  font Strike  -->
      <button v-if="lastSelection?.type == 'text'" @click="editor.chain().focus().toggleStrike().run()"
              :class="{ 'is-active': editor.isActive('strike') }">
        Strike
      </button>
      <!--  font Subscript  -->
      <button v-if="lastSelection?.type == 'text'" @click="editor.chain().focus().toggleSubscript().run()"
              :class="{ 'is-active': editor.isActive('subscript') }">
        Subscript
      </button>
      <!--  font Superscript  -->
      <button v-if="lastSelection?.type === 'text'" @click="editor.chain().focus().toggleSuperscript().run()"
              :class="{ 'is-active': editor.isActive('superscript') }">
        Superscript
      </button>
      <button v-if="lastSelection?.type === 'text'" @click="editor.chain().focus().unsetAllMarks().run()">
        Clear
      </button>

    </div>
  </bubble-menu>

</template>

<style lang="scss" scoped>
.bubble-menu {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--app-grey-950);
  gap: var(--app-space-xxs);
  background: var(--app-grey-1000);
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
}

button {
  border: none;
  background: var(--app-grey-950);
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);

  &:hover {
    background: var(--app-success-3);
  }

  &.is-active {
    background: var(--app-accent-color);
    color: #fff;
  }
}
</style>
