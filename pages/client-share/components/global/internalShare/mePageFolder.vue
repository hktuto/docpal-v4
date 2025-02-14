<script lang="ts" setup>
const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
    title: string,
}>();
</script>
<template>
  <div class="pageContainer--padding">
    <BrowsePageComponent :idOrPath="idOrPath">
      <!-- <template #toolbar_buttons> 
        <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: backPath }">{{$t(title)}}</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item,index) in state.breadcrumbs" :key="item.path"
                    @click="goRoute(item.path, index === state.breadcrumbs.length - 1)">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
      </template> -->
    </BrowsePageComponent>
  </div>
</template>
<style lang="scss" scoped>
</style>