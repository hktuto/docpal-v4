<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'

const { editor, options, initEditor } = inject(DocTemplateProveKey)
const { t } = useI18n()

const titlePredefine = ref(['H1', 'H2', 'H3', 'H4', 'H5'])
const state = reactive({})

function handleTitle(number: number) {
  editor.value.chain().focus().toggleHeading({ level: number }).run()
}
</script>

<template>
  <div class="font-style-toolbar">
    <el-button-group>
      <el-button v-for="(item,index) in titlePredefine" @click="handleTitle(index + 1)"
                 :class="{ 'is-active': editor.isActive('heading', { level: index + 1 }) }">
        {{ item }}
      </el-button>
    </el-button-group>
  </div>

  <div style="text-align: center; margin-top: 44px;">
    {{ t('Style') }}
  </div>

</template>

<style scoped lang="scss">
.font-style-toolbar{
  width: max-content;
}
</style>
