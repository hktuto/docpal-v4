<script lang="ts" setup>
</script>
<template>
<div class="pageContainer--padding">
  <Oauth v-if="allowFeature('MAIL_CONFIG')"  />
  <WhatappsCard  />
</div>
</template>
<style lang="scss" scoped>
.pageContainer--padding {
  overflow: auto;
}
.el-card {
  margin-bottom: var(--app-space-xs);
}
</style>