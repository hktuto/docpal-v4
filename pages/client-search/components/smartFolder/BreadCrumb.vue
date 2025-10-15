<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path" @click="goRoute(item, index)">
      <Icon v-if="item.icon" name="dp-icon:breadcrumb-home" />
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { routeSmartFolder, routeSmartFolderBrowse, routeSmartFolderDetail } from '~/utils/routerHelper'
import { ArrowRight } from '@element-plus/icons-vue'
const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}
type breadcrumbItem = {
  name: string
  path: string
  icon: string
  query: any
}
const props = withDefaults(
  defineProps<{
    breadcrumbs: breadcrumbItem[] | any
  }>(),
  {
    breadcrumbs: []
  }
)

function goRoute(bItem: any, index: number) {
  if (bItem.disabled || index === props.breadcrumbs.length - 1) return
  let routeItem: any = null
  if (bItem.path === '/smartFolder') {
    routeItem = routeSmartFolder(bItem)
  } else if (bItem.path === '/smartFolderDetail') {
    routeItem = routeSmartFolderDetail(bItem)
  }
  // else {
  //     routeItem = routeSmartFolderBrowse(bItem)
  // }
  routerProvider?.navigateTo(routeItem)
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  font-size: var(--app-font-size-l);
  font-weight: 500;
  .el-breadcrumb__item {
    :deep(.el-breadcrumb__inner) {
      cursor: pointer;
      color: var(--app-grey-700);
      font-weight: bold;
      &:hover {
        color: var(--primary-color);
      }
    }
    &:last-child {
      :deep(.el-breadcrumb__inner) {
        line-height: 24px;
        cursor: text;
        font-weight: unset;
        color: var(--app-grey-600);
      }
    }
  }
}
</style>
