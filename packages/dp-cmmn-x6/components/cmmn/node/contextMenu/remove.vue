<script lang="ts" setup>
const props = defineProps<{
    node: any,
    view: any,
}>()

const emits = defineEmits(['clicked'])

function removeNode(){
    emits('clicked');
    nextTick(() => {
        props.node.remove();
    })
}
</script>

<template>
    <el-popconfirm title="Are you sure to delete this?" @confirm="removeNode">
        <template #reference>
            <div class="actionItem">
                
                <SvgIcon src="/icons/menu/trash.svg"></SvgIcon>
                <div class="label">Remove</div>
            </div>
        </template>
    </el-popconfirm>
</template>

<style scoped lang="scss">

</style>