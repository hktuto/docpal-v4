<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const { editor, options, initEditor } = inject(DocTemplateProveKey)
const { t } = useI18n()

const state = reactive({})

function handleBulletList() {
  editor.value.chain().focus().toggleBulletList().run()
}

function handleOrderedList() {
  editor.value.chain().focus().toggleOrderedList().run()
}

/**
 * Set the selected string to align
 * @param align string('left','center','right','justify')
 */
function handleTextAlign(align: string) {
  editor.value.chain().focus().toggleTextAlign(align).run()
}

</script>

<template>
  <div>
    <div>
      <el-button @click="handleBulletList" :class="{ 'is-active': editor.isActive('bulletList') }">
        Bullet List
      </el-button>

      <el-button @click="handleOrderedList" :class="{ 'is-active': editor.isActive('orderedList') }">
        Ordered List
      </el-button>
    </div>
    <div>
      <el-button @click="editor.chain().focus().splitListItem('listItem').run()"
                 :disabled="!editor.can().splitListItem('listItem')">
        Split list item
      </el-button>

      <el-button @click="editor.chain().focus().sinkListItem('listItem').run()"
                 :disabled="!editor.can().sinkListItem('listItem')">
        Sink list item
      </el-button>

      <el-button @click="editor.chain().focus().liftListItem('listItem').run()"
                 :disabled="!editor.can().liftListItem('listItem')">
        Lift list item
      </el-button>
    </div>

    <div>
      <el-button-group>
        <el-button @click="handleTextAlign('left')" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
          {{ t('Left') }}
        </el-button>
        <el-button @click="handleTextAlign('center')"
                   :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
          {{ t('Center') }}
        </el-button>
        <el-button @click="handleTextAlign('right')" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
          {{ t('Right') }}
        </el-button>
        <el-button @click="handleTextAlign('justify')"
                   :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
          {{ t('Justify') }}
        </el-button>
      </el-button-group>
    </div>
  </div>

  <div style="text-align: center; margin-top: 9px;">
    {{ t('Paragraph') }}
  </div>
</template>

<style scoped lang="scss">

</style>