<script lang="ts" setup>
import { ElOption } from 'element-plus';
import { reactive } from 'vue';

const caseEditorProvider = inject(CaseManagementEditorKey)
const {
    workflowInfos,
    type
} = defineProps<{
    workflowInfos: any[]
    type: 'in' | 'out'
}>();


const emits = defineEmits(['change']);

</script>


<template>
    <div class="formContainer" >
        <div v-for="(item, index) in workflowInfos" :key="index" :class="['row', type]">
            <div class="col workflow">
                {{ item.name }}
            </div>
            <div class="col icon">
                <Icon name="lucide:arrow-right" />
            </div>
            <div class="col case">
                <ElSelect >
                    <ElOption v-for="item in caseEditorProvider?.allInfo.value" :key="item.value" :label="item.label" :value="item.value" />
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
        border-top : 1px solid var(--app-grey-850);
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