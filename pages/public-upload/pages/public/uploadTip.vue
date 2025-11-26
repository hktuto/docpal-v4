<template>
  <div style="height: 100vh; width: 100%">
    <LoadingBg></LoadingBg>
    <div class="loadState-container">
      <div>
        <!-- <img src="/logoWithName.png" /> -->
        <h3>{{ $t(`dpTip_${tip}`) }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const tip = computed(() => {
  return route.query.tip || "publicToLogin";
});
</script>

<style lang="scss" scoped>
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
</style>
