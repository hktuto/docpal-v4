<script lang="ts" setup>

</script>

<template>
  <div class="footerContainer">
    footer
    <div class="space"></div>
  </div>
</template>

<style lang="scss" scoped>
.footerContainer{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: var(--app-space-s);
  background: var(--app-grey-975);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.space{
  flex: 1 0 auto;
}
.scale{
  max-width: 100px;
}
</style>
