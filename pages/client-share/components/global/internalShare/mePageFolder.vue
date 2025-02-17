<script lang="ts" setup>
import { clientApi } from "api";
import { routeShareMePage } from "~/utils/routerHelper";
import { MenuRouterKey } from '#imports';

const routerProvider = inject(MenuRouterKey)
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
      homeRouteItem: routeShareMePage()
    }">
    </BrowsePageComponent>
  </div>
</template>
<style lang="scss" scoped>
</style>