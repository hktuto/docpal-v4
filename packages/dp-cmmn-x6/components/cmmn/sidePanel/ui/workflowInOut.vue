<script lang="ts" setup>
import { watch } from 'vue';



const caseEditorProvider = inject(CaseManagementEditorKey)
const emits = defineEmits(['change'])

const props = defineProps<{
    workflowInfos: any[]
    type: 'in' | 'out',
    form: any
}>();
const { workflowInfos, form} = toRefs(props);
const formData = ref<any>([]);

function makeForm() {
    formData.value = []
    if(!workflowInfos.value ) {
        
        return
    }
    workflowInfos.value.forEach((info) => {
        // check if from data has this workflow info
        const newItem = {
            workflowInfoName:"",
            workflowInfoId:"",
            caseInfoId:"",
        }
        const caseInfoKey = props.type === 'in' ? 'attr_target' : 'attr_source'
        const formInfoKey = props.type === 'in' ? 'attr_source' : 'attr_target'
        const originalValue = form.value.find((formItem:any) => {
            console.log("find item in form", formItem[caseInfoKey] === info.id )
            return formItem[caseInfoKey] === info.id
        })
        console.log("originalValue", originalValue)
        newItem.workflowInfoId = info.id;
        newItem.workflowInfoName = info.name;
        newItem.caseInfoId = originalValue ? originalValue[formInfoKey] : ""
        formData.value.push(newItem)
    })
}

function fieldUpdate(item:any, val:string, index:number) {
    const caseInfoKey = props.type === 'in' ? 'attr_source' : 'attr_target'
    const workflowInfoKey = props.type === 'in' ? 'attr_target' : 'attr_source'
    // check if val is empty, if empty, remove this item
    
    if(!val) {
        const indexInForm = form.value.findIndex((formItem:any) => {
            console.log("formItem", workflowInfoKey,  formItem[workflowInfoKey] === item.workflowInfoId,  formItem, item )
            return formItem[workflowInfoKey] === item.workflowInfoId
        })
        if(indexInForm > -1) {
            form.value.splice(indexInForm, 1)
            emits('change', form.value)
        }
        return
    }
    // update local form data
    formData.value[index].caseInfoId = val;

    // update case node form
    // check if item is in form
    const originalValue = form.value.find((formItem:any) => {
        console.log("formItem", workflowInfoKey,  formItem[workflowInfoKey] === item.workflowInfoId,  formItem, item )
        return formItem[workflowInfoKey] === item.workflowInfoId
    })
    if(originalValue) {
        
        originalValue[caseInfoKey] = val
    }else{
        form.value.push({
            [caseInfoKey]: val,
            [workflowInfoKey]: item.workflowInfoId
        })
    }

    emits('change', form.value)
    console.log("fieldUpdate", form.value)
}

const allInfo = computed(() => {
  const formInfo = deepCopy(caseEditorProvider?.allInfo.value)
  return formInfo
})

watch(() => [workflowInfos],() => {
    // workflowinfo or form change, should recalculate form data
    makeForm()
},{
    deep: true,
    immediate: true
})


</script>


<template>
    <div class="formContainer" >
        <div v-for="(item, index) in formData" :key="index" :class="['row', type]">
            <div class="col workflow">
                {{ item.workflowInfoName }}
            </div>
            <div class="col icon">
                <Icon name="lucide:arrow-right" />
            </div>
            <div class="col case">
              
                <ElSelect v-model="item.caseInfoId" clearable filterable placeholder="Select Case Infomation" @change="(val) => fieldUpdate(item, val, index)">
                    <ElOption v-for="item in allInfo" :key="item.value" :label="item.label" :value="item.value" />
                </ElSelect>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.formContainer{

}
.row{
    display: grid;
    grid-template-columns: 1fr 24px 1fr;
    grid-template-areas: "workflow icon case";
    flex-flow: var(--direction) nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xs);
    padding-block: var(--app-space-s);
    &.in {
        grid-template-areas: "case icon workflow";
    }
    & + .row{
        border-top : 1px solid var(--app-grey-800);
    }
}
.workflow{
    grid-area: workflow;
}
.case {
    grid-area: case;
}
.icon{
    grid-area: icon;
}
.col{
}
</style>
