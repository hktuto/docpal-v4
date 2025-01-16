<script lang="ts" setup>

const editorEl = ref()

function getGraphJson(){
    editorEl.value.getGraphJson()
}

function centerGraph(){
    editorEl.value.centerGraph()
}
async function loadX6Json() {
    const cmmnString = await fetch('/cmmn/test.xml').then(res => res.text())
    const x6Json = await fetch('/cmmn/x6Test.json').then(res => res.json())
    editorEl.value.init(cmmnString, x6Json)
}
async function getFileAndDisplay(path: string){
    const cmmnString = await fetch(path).then(res => res.text())
    editorEl.value.init(cmmnString)
}

function save() {
    editorEl.value.save()
}
async function getSavedData() {
    const cmmnString = await fetch('/cmmn/saved.xml').then(res => res.text())
    const x6Json = await fetch('/cmmn/saved.json').then(res => res.json())
    
    editorEl.value.init(cmmnString, x6Json)
}
</script>

<template>
  <NuxtLayout class="fit-height" back-path="/">
      <div class="pageContainer">
          
      
        <CmmnEditor ref="editorEl"  />
          <div class="bottom">
              <ElButton @click="getFileAndDisplay('/cmmn/newTemplate.xml')"> load empty new template</ElButton>
              <ElButton @click="getFileAndDisplay('/cmmn/docpal_setup.cmmn.xml')"> load Cmmn XMl</ElButton>
              <ElButton @click="getSavedData"> load Saved Xml</ElButton>
              <ElButton @click="loadX6Json"> load Cmmn XML and x6 json</ElButton>
              <ElButton @click="centerGraph">center</ElButton>
              <ElButton @click="getGraphJson"> getGraphJson</ElButton>
              <ElButton @click="save"> Save</ElButton>
          </div>
      </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.pageContainer{
    width:100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr min-content;
    padding: calc( var(--app-padding) * 1.5);
}
.bottom{
    width:100%;
    padding: calc(var(--app-padding) * 2);
    border-top: 1px solid var(--color-grey-400);
}
</style>