<script lang="ts" setup>
const { options, scale, doc } = inject('docEditor')
const {index} = defineProps<{
  index: number,
}>()

const emits = defineEmits(['addPage', 'emptyPage'])
const pageEl = ref()
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
const focusEl = ref(0)
function handleEmptyCase() {
  // push empty block to page
  if(doc.value[index].content.length === 0) {
    doc.value[index].content.push({
      id: Date.now(),
      type: 'Paragraph',
      content: ''
    })

    setTimeout(() => {
      console.log(elsRef.value.length)
      if(elsRef.value[0]) {
        elsRef.value[0].focus()
      }
    },100)
  }else{
    if(elsRef.value[elsRef.value.length - 1]) {
      elsRef.value[elsRef.value.length - 1].focus()
    }
  }
}

function deleteComponent(deletItemIndex:number) {
  console.log('deleteComponent',  doc.value[index].content.length, doc.value[index].content.length === 0)
  if(doc.value[index].content.length !== 0) {
    doc.value[index].content.splice(deletItemIndex, 1)
    setTimeout(() => {
      elsRef.value[deletItemIndex - 1].focus()
    },100)
  }
}

function addComponent(spliIndex:number) {
  const newComponent = {
    id: Date.now(),
    type: 'Paragraph',
    content: ''
  }
  doc.value[index].content.splice(spliIndex + 1, 0, newComponent)
  setTimeout(() => {
    elsRef.value[spliIndex + 1].focus()
  },100)
}

function focusNext(selectIndex?:number = -1) {
  if(focusEl.value + 1 < elsRef.value.length) {
    elsRef.value[focusEl.value + 1].focus(null, selectIndex)
  }
}
function focusPrev(selectIndex?:number = -1) {
  if(focusEl.value - 1 >= 0) {
    console.log(selectIndex)
    elsRef.value[focusEl.value - 1].focus(null, selectIndex)
  }
}

</script>


<template>
  <div
    ref="pageEl"
    class="pageContainer"
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
      <template  v-for="(item,itemIndex) in doc[index].content" :key="item.id" >
        <component 
          :is="`DocTemplateContent${item.type}`" 
          ref="elsRef" 
          :setting="item" 
          :index="itemIndex"
          :id="item.id" 
          @next="focusNext"
          @prev="focusPrev"
          @focus="focusEl = itemIndex"
          @remove="deleteComponent(itemIndex)"
          @add="addComponent(itemIndex)"
        />
      </template>
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
