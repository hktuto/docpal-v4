<script lang="ts" setup>

const editorEl = ref()

function getGraphJson(){
    editorEl.value.getGraphJson()
}
async function loadX6Json() {
    const cmmnString = await fetch('/cmmn/test.xml').then(res => res.text())
    const x6Json = await fetch('/cmmn/x6Test.json').then(res => res.json())
    editorEl.value.init(cmmnString, x6Json)
}
async function getFileAndDisplay(){
    const cmmnString = await fetch('/cmmn/test.xml').then(res => res.text())
    editorEl.value.init(cmmnString)
}

</script>

<template>
    <NuxtLayout class="fit-height" back-path="/">
        <div class="pageContainer">
          
            <CmmnViewer ref="editorEl"  />
            <div class="bottom">

                <ElButton @click="getFileAndDisplay"> test 1</ElButton>
                <ElButton @click="loadX6Json"> load x6 json</ElButton>
                <ElButton @click="getGraphJson"> getGraphJson</ElButton>
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
    padding: calc( var(--app-space-xs) * 1.5);
}
.bottom{
    width:100%;
    padding: calc(var(--app-space-xs) * 2);
    border-top: 1px solid var(--app-grey-400);
}
</style>