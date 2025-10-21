<script lang="ts" setup>
import type { NodeSettingItem } from "../../../utils/cmmnX6Elements";
import type {CaseItemType} from "../../../utils/cmmn";
const props = defineProps<{
    setting: NodeSettingItem
    type: CaseItemType
    disabled: boolean
}>();


const emits = defineEmits(['mousedown'])



function mousedown(ev:any) {
    if(props.disabled) {
        return;
    }
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
    <div :class="{toolItemContainer:true, disabled}">
        <ElTooltip v-if="!disabled" placement="right" :content="setting.toolBarLabel">
            <SvgIcon class="icon" :src="setting.toolBarIcon" @mousedown.native="mousedown"></SvgIcon>
        </ElTooltip>
        <SvgIcon v-else class="icon" :src="setting.toolBarIcon" ></SvgIcon>
    </div>
</template>

<style scoped lang="scss">
.toolItemContainer{
    --color:#000;
    --icon-color: var(--app-grey-000);
    --cursor: grab;
    cursor: var(--cursor);
    &:hover {
        --icon-color: var(--app-main-color);
    }
    &.disabled {
        --icon-color: var(--app-grey-950) !important;
        --cursor: not-allowed;
    }
}
.icon{
    :deep(svg) {
        cursor: var(--cursor);
    }
}
</style>
