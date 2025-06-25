<template>
    <el-tag  :class="['userRightItem',{ [ace.type]:true }]" effect="dark"
              :closable="false" >
              {{ ace.userId }}
    </el-tag>
</template>

<script lang="ts" setup>
const props = defineProps<{ace:{userId: string, type:string},permission:any }>();
</script>

<style scoped lang="scss">
.el-tag{
    &.inherited{
        --el-tag-bg-color: var(--app-grey-400);
        --el-tag-border-color: var(--app-grey-400);
    }
}
</style>
