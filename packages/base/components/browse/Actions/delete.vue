<template>
  <!-- <SvgIcon src="/icons/file/delete.svg" round content="delete"
              @click="deleteItem(doc)"></SvgIcon> -->
  <BrowseActionsButton id="deleteActionButton" :label="$t('tip.delete')" @click="deleteItem(doc)">
    <SvgIcon src="/icons/file/delete.svg" round :content="$t('tip.delete')"></SvgIcon>
  </BrowseActionsButton>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { Loading } from '@element-plus/icons-vue'
import { ElNotification, ElMessageBox } from 'element-plus'

const props = defineProps<{
  doc?: any
}>()
const emits = defineEmits(['delete'])

async function deleteItem(doc: any) {
  const ev = new CustomEvent('docActionDelete', {
    detail: {
      ...doc,
      deleteType: doc.isFolder ? 'folder' : 'file'
    }
  })
  document.dispatchEvent(ev)
}
</script>
