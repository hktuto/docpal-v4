<script lang="ts" setup>
import { Graph, Node } from "@antv/x6";
const props = defineProps<{
    graph: Graph;
    node: Node;
    disabled: boolean;
}>();
const { node } = toRefs(props);
const { caseId } = useCmmnGraph();
</script>

<template>
    <ElForm ref="FormRef" label-position="top" :model="form" @submit.prevent>
        <el-formItem
            label="assignee"
            prop="assignee"
            :rules="[{ required: true, message: $t('form_common_requird') }]"
        >
    </ElForm>
</template>

<style scoped lang="scss">

</style>