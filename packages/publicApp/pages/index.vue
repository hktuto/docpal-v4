<template>
<div class="main-container">
  <LoadingBg></LoadingBg>
  <div class="bg">
    <img src="/logoWithName.png" />
  </div>
</div>
</template>
<style lang="scss" scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.bg {
  width: 40%;
  height: 40vh;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 80%
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
</style>