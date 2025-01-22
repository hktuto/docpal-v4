<script lang="ts" setup>
const props = defineProps<{
    doc: any
}>()
const router = useRouter()
function addWartermark(){
    const ev2 = new CustomEvent('closeFilePreview', )
    document.dispatchEvent(ev2);
    const ev = new CustomEvent('docWatermark', {detail: props.doc})
    document.dispatchEvent(ev)
}

</script>


<template>
   <BrowseActionsButton id="watermarkActionButton" :label="$t('filePopover_watermark')" @click="addWartermark">
    
    <SvgIcon src="/icons/menu/watermark.svg" round :content="$t('filePopover_watermark')"
                ></SvgIcon>
  </BrowseActionsButton> 
</template>