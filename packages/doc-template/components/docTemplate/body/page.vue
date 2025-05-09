<script lang="ts" setup>
const { options, scale, doc } = inject('docEditor')
const {index} = defineProps<{
  index: number,
}>()

const emits = defineEmits(['addPage', 'emptyPage'])

const pageSize = computed(() => {
  return {
    width: twipToPx(options.value.pageSize.width || '11905.511811'), // A4 size in TWIP
    height: twipToPx(options.value.pageSize.height || '16837.795276'), // A4 size in TWIP
    marginTop: twipToPx(options.value.pageMargins.top || '1000'), // A4 size in TWIP
    marginLeft: twipToPx(options.value.pageMargins.left || '1000'), // A4 size in TWIP
    marginRight: twipToPx(options.value.pageMargins.right || '1000') ,// A4 size in TWIP
    marginBottom: twipToPx(options.value.pageMargins.bottom || '1000'), // A4 size in TWIP
  }
})
const elsRef = ref([])
function handleEmptyCase() {
  // push empty block to page
  if(doc.value[index].content.length === 0) {

    doc.value[index].content.push({
      id: options.value.title + '_page_' + index + '_empty',
      type: 'Paragraph',
      content: ''
    })
  }
  console.log(elsRef.value)
}

</script>


<template>
  <div class="pageContainer"
    :style="`
      width: ${pageSize.width * scale / 100}px;
      height: ${pageSize.height * scale / 100}px;
      --top: ${pageSize.marginTop * scale / 100}px;
      --left: ${pageSize.marginLeft * scale / 100}px;
      --right: ${pageSize.marginRight * scale / 100}px;
      --bottom: ${pageSize.marginBottom * scale / 100}px;
    `"
    >
    <div class="topLeft"></div>
    <div class="topCenter"></div>
    <div class="topRight"></div>
    <div class="centerLeft"></div>
    <div class="centerRight"></div>
    <div class="bottomLeft"></div>
    <div class="bottomCenter"></div>
    <div class="bottomRight"></div>
    <div class="mairginContainer" 
      :id="options.title + '_page_' + page" @click="handleEmptyCase" >
        <component 
          v-for="(item,itemIndex) in doc[index].content" 
          :is="`DocTemplateContent${item.type}`" 
          ref="elsRef" 
          :key="item.id" 
          :setting="item" 
          :id="item.id" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .pageContainer{
    --border-color: var(--app-grey-800);
    --crossHairSize: 30%;
    --crossHairWidth: 2px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    display: grid;
    grid-template-areas: "topLeft topCenter topRight"
                         "centerLeft  mairginContainer centerRight"
                         "bottomLeft bottomCenter bottomRight";
    grid-template-columns: var(--left) 1fr var(--right);
    grid-template-rows: var(--top) 1fr var(--bottom);

  }
  .topLeft{
    grid-area: topLeft;
    position: relative;
    &:after {
      content: "";
      display: block;
      width: var(--crossHairSize);
      height: var(--crossHairSize);
      border-right: var(--crossHairWidth) solid var(--border-color);
      border-bottom: var(--crossHairWidth) solid var(--border-color);
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .topCenter{
    grid-area: topCenter;
  }
  .topRight{
    grid-area: topRight;
    position: relative;
    &:after {
      content: "";
      display: block;
      width: var(--crossHairSize);
      height: var(--crossHairSize);
      border-left: var(--crossHairWidth) solid var(--border-color);
      border-bottom: var(--crossHairWidth) solid var(--border-color);
      position: absolute;
      bottom: 0;
      left: 0;
    }
    
  }
  .centerLeft{
    grid-area: centerLeft;
  }
  .centerRight{
    grid-area: centerRight;
  }
  .bottomLeft{
    grid-area: bottomLeft;
    position: relative;
    &:after {
      content: "";
      display: block;
      width: var(--crossHairSize);
      height: var(--crossHairSize);
      border-right: var(--crossHairWidth) solid var(--border-color);
      border-top: var(--crossHairWidth) solid var(--border-color);
      position: absolute;
      top: 0;
      right: 0;
    }
    
  }
  .bottomCenter{
    grid-area: bottomCenter;
  }
  .bottomRight{
    grid-area: bottomRight;
    position: relative;
    &:after {
      content: "";
      display: block;
      width: var(--crossHairSize);
      height: var(--crossHairSize);
      border-left: var(--crossHairWidth) solid var(--border-color);
      border-top: var(--crossHairWidth) solid var(--border-color);
      position: absolute;
      top: 0;
      left: 0;
    }
    
  }
  .mairginContainer{
    grid-area: mairginContainer;
    background: transparent;
  }
</style>
