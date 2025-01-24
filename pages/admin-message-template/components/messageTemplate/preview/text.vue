<script setup lang="ts">
const { template, variables, bgColor = '#f1f1f1', title = 'Whatsapp', showConfirm=false } = defineProps<{
    template: any,
    variables: any,
    bgColor: string,
    title: string,
    showConfirm: boolean,
}>()

function replaceVariables(str:string, variables:any) {
    if(!str) return ''
    if(!variables) return str
    return str.replace(/{{(.*?)}}/g, (match:any, p1:any) => {
        if(!variables || !variables[p1]) return match
        return variables[p1]
    })
}

const displayHeader = computed(() => {
    // replace {{}}
    return replaceVariables(template.header, variables)
})

const displayBody = computed(() => {
    // replace {{}}
    return replaceVariables(template.body, variables)
})

const displayFooter = computed(() => {
    // replace {{}}
    return replaceVariables(template.footer, variables)
})

</script>

<template>
<div class="previewContainer" :style="{background: bgColor}">
    <div class="templateHeader">
        <div class="title">
            {{title}}
        </div>
    </div>
    <div class="messageContainer">
        <div class="content message">
            <div class="header">
                {{displayHeader}}
            </div>
            <div class="body">
                {{displayBody}}
            </div>
            <div class="footer">
                {{displayFooter}}
            </div>
        </div>
        <div v-if="template.needConfirm && showConfirm" class="confirmMessage">
            {{template.confirmButtonName}}
        </div>
        <div v-if="template.needConfirm" class="afterMessage message">
            {{template.textMessage}}
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.templateHeader{
    width: 100%;
    padding: var(--app-space-s);
    background: var(--app-grey-1000);
    font-size: var(--app-font-size-l);
    font-weight: bold;
}
.messageContainer{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-s);
    padding: var(--app-space-s);
    overflow: auto;
    .header{
        font-weight: bold;
    }
}
.previewContainer{
    width:100%;
    max-width: 320px;
    height: 100%;
    max-height: 500px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--app-shadow-s);
    border-radius: var(--app-border-radius-m);
}
.message{
    width: 100%;
    padding: var(--app-space-s);
    border-radius: var(--app-border-radius-m) var(--app-border-radius-m) 0 var(--app-border-radius-m);
    background: var(--app-grey-1000);
    position: relative;
    // add triangle to bottom right corner

    &:before{
        content: '';
        position: absolute;
        bottom: calc( var(--app-space-s) * -1);
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 var(--app-space-s) var(--app-space-s) 0;
        border-color: transparent var(--app-grey-1000) transparent transparent;
    }
}
.confirmMessage{
    width:100%;
    padding: var(--app-space-s);
    background: var(--app-grey-1000);
    border-radius: var(--app-border-radius-m);
    text-align: center;
    color: blue;
}
</style>