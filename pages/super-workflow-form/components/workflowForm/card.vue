<template>
<el-card @dblclick.stop="handleDbClick()">
    <div class="title ellipsis">{{data.name}}</div>
    <div class="subTitle">{{$t('task')}}</div>
    <div class="taskListContainer">
        <div v-for="(item, index) in data.userTasks" class="ellipsis" :title="item.name" 
            @dblclick.stop="handleDbClick(item)">{{item.name}}</div>
    </div>
</el-card>
</template>


<script lang="ts" setup>
import { routeWorkflowFormDetail } from '~/utils/superWorkflowRouterHelper';
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
    data: any
}>()
function handleDbClick(row?: any) {
if (!row) row = props.data.userTasks[0]
  routerProvider?.navigateTo(routeWorkflowFormDetail({...row, processKey: props.data.key}), false)
    // router.push(`/workflowForm/${props.data.key}?taskId=${row.id}`)
}
</script>

<style lang="scss" scoped>
.el-card {
    background-color: var(--app-grey-950) !important;
    height: 200px;
    display: grid;
    :deep(.el-card__body) {
        display: grid;
        grid-template-rows: min-content min-content 1fr;
        overflow: hidden;
        .title {
            color: var(--app-primary-color);
            font-size: 1.5rem;
            cursor: pointer;
        }
        .subTitle {
            color: var(--app-primary-color);
            opacity: 0.7;
            padding: calc(var(--app-space-xs) / 2) 0;
        }
        .taskListContainer {
            overflow: auto;
            & > div{
                padding: calc(var(--app-space-xs) / 3) 0;
                color: var(--app-grey-300);
                &:hover {
                    color: var(--el-color-primary-light-3);
                }
            }
        }
    }
}
</style>
