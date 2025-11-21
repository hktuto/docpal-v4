<template>
    <el-tag  :class="['userRightItem',{ [ace.type]:true }]" effect="dark"
              :closable="false" >
              {{ ace.name }}
    </el-tag>
</template>

<script lang="ts" setup>
const props = defineProps<{ace:{name: string, type:string},permission:any }>();
</script>

<style scoped lang="scss">
.el-tag{
  --el-tag-bg-color: var(--app-grey-900);
  --el-tag-border-color: var(--app-grey-900);
  --el-tag-text-color: var(--app-text-color-primary);
    &.inherited{
        --el-tag-bg-color: var(--app-grey-900);
        --el-tag-border-color: var(--app-grey-900);
    }
}
</style>
