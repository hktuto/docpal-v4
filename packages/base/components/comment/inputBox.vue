<template>
  <div class="commentInputBox">
    <CommentMention :options="props.mentionData" v-model="_text" @keydown.enter.native="keyDown" />
    <div class="commentInputBox_ribbon">
      <el-button id="Browse__Info__Comments__EnterYourCommentHere__Send" type="primary" size="small" class="buttonText" @click="handleAdd" :loading="loading">
        {{ $t('comments_buttonText') }}
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { MentionOption } from 'element-plus/es/components/mention/src/types'

const emit = defineEmits(['handleAdd'])
const props = withDefaults(
  defineProps<{
    text?: string
    mentionData?: MentionOption[]
  }>(),
  {
    // @ts-ignore
    mentionData: []
  }
)
//@ts-ignore
const state = reactive({
  _text: '',
  loading: false
})

function handleAdd() {
  const s = state._text.replace(/[\ +\n\r]/g, '')
  if (!s) {
    state._text = ''
    return
  }
  if (state.loading) return
  state.loading = true
  emit('handleAdd', state._text, () => {
    state._text = ''
    state.loading = false
  })
}
function keyDown(e) {
  e.stopPropagation()

  if (e.ctrlKey || e.shiftKey) {
    //用户点击了ctrl+enter触发
    state._text += '\n'
  } else {
    //用户点击了enter触发
    handleAdd()
  }
}
//@ts-ignore
const { _text, loading } = toRefs(state)
//@ts-ignore
watch(
  () => props.text,
  (newValue) => {
    state._text = newValue || ''
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.commentInputBox {
  border-radius: 5px;
  background-color: var(--app-grey-950);
  padding: var(--app-space-xs);
  color: var(--app-grey-050);

  :deep(textarea) {
    border: unset;
    box-shadow: unset;
    background-color: unset;
  }

  &_ribbon {
    text-align: right;
  }
}
</style>
