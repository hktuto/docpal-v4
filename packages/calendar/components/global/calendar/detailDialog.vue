<script lang="ts" setup>
import { ElDialog } from 'element-plus'
const opened = ref(false)
const { options } = defineProps<{

    options: CalendarOptions,
}>()
const eventDetail = ref<DocPalEventType>()
function open(ev:DocPalEventType) {
    eventDetail.value = ev
    opened.value = true
}

defineExpose({
    open
})
</script>
<template>

    <ElDialog v-model="opened" draggable >
        {{eventDetail}}
    </ElDialog>
</template>