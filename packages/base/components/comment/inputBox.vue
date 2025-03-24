<template>
  <div class="commentInputBox">
    <el-mention
      ref="mentionRef"
      type="textarea"
      :options="state.mentionData" whole
      :autosize="{ minRows: 2, maxRows: 4}"
      v-model="_text"
      :placeholder="$t('comments_placeholder')"
      resize="none"
      :check-is-whole="checkIsWhole"
      @keydown.enter.native="keyDown"
      @select="handleAddMention"
    ></el-mention>
    <!-- @keydown.enter.native="keyDown" -->

    <div class="commentInputBox_ribbon">
      <el-button id="Browse__Info__Comments__EnterYourCommentHere__Send" type="primary" size="small" class="buttonText"
                 @click="handleAdd" :loading="loading">
        {{ $t('comments_buttonText') }}
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type {MentionOption} from 'element-plus/es/components/mention/src/types';

const emit = defineEmits(['handleAdd'])
const props = withDefaults(defineProps<{
  text?: string,
  mentionData?: MentionOption[]
}>(), {
  // @ts-ignore
  mentionData: []
})
//@ts-ignore
const state = reactive({
  _text: '',
  loading: false,
  mentionData: []
})
//@ts-ignore
const mentionRef = ref()
//@ts-ignore
const isMention = computed(() => {
  return !!props.mentionData && props.mentionData.length > 0
})

function checkIsWhole(pattern: string, prefix: string) {
  const user = props.mentionData.find(item => item.value === pattern)
  if (!!user) state.mentionData.push(user)
  return !!user
}

function keyDown(e) {
  e.stopPropagation()
  if (isMention.value) {
    if (e.ctrlKey || e.shiftKey) {   //用户点击了ctrl+enter触发
      handleAdd()
    }
  } else {
    if (e.ctrlKey || e.shiftKey) {   //用户点击了ctrl+enter触发
      state._text += '\n';
    } else { //用户点击了enter触发
      handleAdd()
    }
  }
}

function handleAddMention(option: MentionOption, prefix: string) {
  handleMentionDataFilter()
}

function handleMentionDataFilter() {
  const regex = /@\S* /g;

  let matches = state._text.match(regex);
  matches = matches.map(item => item.replace('@', '').trim())
  state.mentionData = props.mentionData.filter(item => !matches?.includes(item.value))
}

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

//@ts-ignore
const {_text, loading} = toRefs(state)
//@ts-ignore
watch(() => props.text, (newValue) => {
  state._text = newValue || ''
}, {immediate: true})
//@ts-ignore
watch(() => props.mentionData, (newValue) => {
  if (!props.mentionData) return
  state.mentionData = [...props.mentionData]
}, {
  immediate: true
})
</script>
<style lang="scss" scoped>
.commentInputBox {
  border-radius: 5px;
  background-color: var(--app-grey-950);
  padding: var(--app-space-xs);
  color: var(--app-grey-050);

  :deep(.el-textarea__inner) {
    border: unset;
    box-shadow: unset;
    background-color: unset;
  }

  &_ribbon {
    text-align: right;
  }
}
</style>