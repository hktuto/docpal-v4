<script lang="ts" setup>
import { clientApi } from "api";
import { routeShareOtherPage } from "~/utils/routerHelper";
const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
    title: string,
    homeId: string,
}>();

</script>
<template>
  <div class="pageContainer--padding">
    <BrowsePageComponent :idOrPath="idOrPath" :home="{
      secondId: homeId,
      homeRouteItem: routeShareOtherPage({})
    }">
    </BrowsePageComponent>
  </div>
</template>
<style lang="scss" scoped>
</style>