<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'

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


</script>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          v-tooltip="t('docTemplate.paragraph.bulletList')"
          @click="handleBulletList"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          {{ $t('docTemplate.paragraph.bulletList') }}
        </el-button>
        <el-button
          v-tooltip="t('docTemplate.paragraph.orderedList')"
          @click="handleOrderedList"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          {{ $t('docTemplate.paragraph.orderedList') }}
        </el-button>
        <el-divider direction="vertical" />
        <el-button-group class="font-style-toolbar">
          <el-button
            v-tooltip="t('docTemplate.paragraph.splitListItem')"
            @click="editor.chain().focus().splitListItem('listItem').run()"
            :disabled="!editor.can().splitListItem('listItem')"
          >
            {{ $t('docTemplate.paragraph.splitListItem') }}
          </el-button>
          <el-button
            v-tooltip="t('docTemplate.paragraph.sinkListItem')"
            @click="editor.chain().focus().sinkListItem('listItem').run()"
            :disabled="!editor.can().sinkListItem('listItem')"
          >
            {{ $t('docTemplate.paragraph.sinkListItem') }}
          </el-button>
          <el-button
            v-tooltip="t('docTemplate.paragraph.liftListItem')"
            @click="editor.chain().focus().liftListItem('listItem').run()"
            :disabled="!editor.can().liftListItem('listItem')"
          >
            {{ $t('docTemplate.paragraph.liftListItem') }}
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row class="font-style-toolbar">
      <el-col :span="24">
        <el-button-group v-tooltip="t('docTemplate.paragraph.textAlign')">
          <el-button size="small" @click="handleTextAlign('left')"
                     :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
            {{ $t('docTemplate.paragraph.left') }}
          </el-button>
          <el-button size="small" @click="handleTextAlign('center')"
                     :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
            {{ $t('docTemplate.paragraph.center') }}
          </el-button>
          <el-button size="small" @click="handleTextAlign('right')"
                     :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
            {{ $t('docTemplate.paragraph.right') }}
          </el-button>
          <el-button size="small" @click="handleTextAlign('justify')"
                     :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
            {{ $t('docTemplate.paragraph.justify') }}
          </el-button>
        </el-button-group>
      </el-col>
      <el-button-group v-tooltip="t('docTemplate.paragraph.indentation')">
        <el-button size="small" @click="handleIndent(true)">
          {{ $t('docTemplate.paragraph.indentationIncrease') }}
        </el-button>
        <el-button size="small" @click="handleIndent(false)">
          {{ $t('docTemplate.paragraph.indentationDecrease') }}
        </el-button>
      </el-button-group>
    </el-row>
  </div>

  <div style="text-align: center; margin-top: 10px;">
    {{ $t('docTemplate.paragraph.paragraph') }}
  </div>
</template>

<style scoped lang="scss">
.font-style-toolbar {
  width: max-content;
}

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
