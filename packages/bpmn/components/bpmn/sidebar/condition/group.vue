<script lang="ts" setup>
const {elements, index} = defineProps<{
    elements: any[],
    index: number
}>()
const emits = defineEmits(['delete', 'update'])

function deleteItem(itemIndex:number) {
    elements.splice(itemIndex, 1)
    if(elements.length === 0) {
        emits('delete', index)
    }else{
        emits('update', elements)
    }
}

function addNewElement(){
    const newData = {
        attr_id: 'element_' + new Date().getTime(),
        attr_type:"String_Validation" ,
        attr_source:"form",
        attr_fieldName:'',
        attr_condition:"is",
        attr_target:"string",
        attr_targetValue:""
    }
    elements.push(newData)
    emits('update', elements)
}

function updateItem(newVal:any, elementIndex:number) {
    elements[elementIndex] = newVal
    emits('update', elements)
}

</script>

<template>
    <div class="conditionContainer">
       
        <div v-for="(item,elementIndex) in elements" :key="item.attr_id" class="elementsContainer">
            <BpmnSidebarConditionElement  
                :element="item"
                 @delete="deleteItem(elementIndex)" 
                 @update="(newVal:any) => updateItem(newVal, elementIndex)" />
            <div v-if="elementIndex === elements.length - 1" class="moreButtonContainer" @click="addNewElement">
                <Icon name="lucide:plus"  />
                <div class="label">Or</div>
            </div>
            <ElDivider v-else />
        </div>
        
    </div>

</template>

<style scoped lang="scss">
.elementsContainer{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-xs);
    position: relative;
}
.moreButtonContainer{
    width:100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: var(--app-space-xs);
    cursor: pointer;
    font-size: var(--app-font-size-s);
    position: relative;
    &:hover {
        color: var(--app-main-color);
    }
    &:before{
        content: "";
        width: 40%;
        height: 1px;
        background: var(--app-grey-800);
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
    }
    &:after{
        content: "";
        width: 40%;
        height: 1px;
        background: var(--app-grey-800);
        display: block;
        position: absolute;
        top: 50%;
        right: 0;
    }
}
.conditionContainer{
    width:100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-xs);
    overflow: auto;
    padding: var(--app-space-s);
    border: 1px solid var(--app-grey-700);
    border-radius: var(--app-border-radius-m);
    position: relative;
}
:deep(.el-divider--horizontal){
    margin-block: var(--app-space-xxs);
}
</style>