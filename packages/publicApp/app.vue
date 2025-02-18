<script lang="ts" setup>
import { getLocale } from '~/utils/loading'
const loadState:string = useLoadState()
initPublicLayout()

</script>

<template>
<div class="pageContainer--padding">
    <template v-if="loadState === 'Ready'" class="main-container">
        <NuxtPage />
    </template>
    <div v-else style="height: 100%;width: 100%;">
      <LoadingBg></LoadingBg>
      <div class="loadState-container">
        <div>
          <img src="/logoWithName.png" />
          <div>{{loadState}}</div>
        </div>
      </div>
  </div>
</div>

</template>


<style scoped lang="scss">
.pageContainer--padding {
    height: 100vh
}

.loadState-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;   
  div:first-child {
    font-size: 28px;
    width: 40%;
    height: 40vh;
    border-radius: 6px;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba(255, 255, 255, 0.6);
    }
  } 
}
.logoContainer{
    // padding: var(--menu-item-padding);
    --icon-size: calc(var(--icon-font-size) + (var(--menu-item-padding) * 2));
}
</style>


