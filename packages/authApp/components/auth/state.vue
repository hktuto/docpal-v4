<script lang="ts" setup>
const { loggedIn, logout, ready  } = useAuth()
</script>

<template>
    <Transition appear>
        <slot v-if="ready" v-bind="{ loggedIn, logout }" />
        <slot v-else name="placeholder" />
    </Transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

