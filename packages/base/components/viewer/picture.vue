<script setup lang="ts">
import 'viewerjs/dist/viewer.css'
  const props = withDefaults(defineProps<{
    images: string [],
    options: {
      inline?:boolean,
      button?:boolean,
      navbar?:boolean,
      title?:boolean,
      toolbar?:boolean,
      tooltip?:boolean,
      movable?:boolean,
      zoomable?:boolean,
      rotatable?:boolean,
      scalable?:boolean,
      transition?:boolean,
      fullscreen?:boolean,
      keyboard?:boolean
    }
  }>(),{
    options:{  }
  })
const viewer = ref()
const isFail = ref(false)
const emits = defineEmits(['fail'])

const renderOptions = computed(() => {
  return Object.assign(
    { inline: true, button: false, navbar: false, title: false, toolbar: false, tooltip: false, movable: true, zoomable: true, rotatable: false, scalable: true, transition: true, fullscreen: true, keyboard: true },
    props.options
  )
})

function show(){
  viewer.value.show()
}

</script>

<template>
<div class="pictureContainer">
  <div class="viewerContainer" v-viewer="renderOptions">
    <img v-for="src in images" :src="src" :key="src" hidden @error="$emit('fail')">
  </div>
</div>
</template>

<style scoped lang="scss">
.pictureContainer, .viewerContainer{
  width: 100%;
  height: 100%;
}
</style>
