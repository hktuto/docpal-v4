<template>
<BrowseActionsButton id="officeActionButton" :label="$t('tip.templateReplace')" >
    <SvgIcon src="/icons/replace.svg" round :content="$t('tip.templateReplace')"
            @click="handleOpen"
                ></SvgIcon>
    <TemplateReplaceDialog ref="TemplateReplaceDialogRef" @refresh="emits('refresh')"/>
</BrowseActionsButton>
</template>

<script lang="ts" setup>
const props = defineProps<{
    templateInfo: any
}>()
const emits = defineEmits([
    'refresh'
])
const TemplateReplaceDialogRef = ref()
function handleOpen () {
    TemplateReplaceDialogRef.value.handleOpen(props.templateInfo)
}
</script>