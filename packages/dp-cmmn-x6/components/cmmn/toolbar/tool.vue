<script lang="ts" setup>
import { NodeSettingItem } from "../../../utils/cmmnX6Elements";
import {CaseItemType} from "../../../utils/cmmn";
const props = defineProps<{
    setting: NodeSettingItem
    type: CaseItemType
}>();

const emits = defineEmits(['mousedown'])



function mousedown(ev) {
    
    const newTaskId = props.type + new Date().getTime()
    const newPlanItemId = "planItem_" + newTaskId
    const style = props.setting.nodeStyle
    const data = props.setting.newNodeData(newTaskId, newPlanItemId, props.type)
    const dragItemOption = {
        ...style,
        id: newTaskId,
        label: null,
        width:40,
        height:40,
        zIndex: 999,
        data
    }

    const dropItemStyle = {
        width:style.width,
        height:style.height,

    }
    console.log({dragItemOption, dropItemStyle, ev})
    emits('mousedown', {dragItemOption, dropItemStyle, ev})
}
</script>

<template>
    <div class="toolItemContainer">
        <ElTooltip placement="right" :content="setting.toolBarLabel">
            <SvgIcon class="icon" :src="setting.toolBarIcon" @mousedown.native="mousedown"></SvgIcon>
        </ElTooltip>
    </div>
</template>

<style scoped lang="scss">
.toolItemContainer{
    --color:#000;
}
.icon{
    cursor: grab;
    &:hover{
        --icon-color: var(--primary-color);
    }
    &:active{
         --icon-color: var(--primary-color);
     }
}
</style>