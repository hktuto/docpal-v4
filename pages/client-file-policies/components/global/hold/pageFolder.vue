<script lang="ts" setup>
import { clientApi } from "api";
import { routeHoldPage } from "~/utils/routerHelper";

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
      homeRouteItem: routeHoldPage({})
    }">
    </BrowsePageComponent>
  </div>
</template>
<style lang="scss" scoped>
</style>