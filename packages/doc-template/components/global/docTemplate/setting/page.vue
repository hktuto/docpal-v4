<script lang="ts" setup>
import { DocTemplateProveKey } from '~/utils/docTempalteHelper';


const { editor, editorOptions } = inject(DocTemplateProveKey)


const opened = ref(false);
const form = ref({

})

function updatePageSetting(){

}

function open(){
  // TODO : get page Setting
  opened.value = true
}

</script>


<template>
  <div class="iconContainer" @click="open">
    asfasf 
  </div>
  <ElDialog v-model="opened">
    asdasfgas
  </ElDialog>
</template>
