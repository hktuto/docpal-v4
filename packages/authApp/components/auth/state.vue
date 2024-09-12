<script lang="ts" setup>

const { loggedIn, logout, ready  } = useAuth()

</script>

<template>
    <slot
        v-if="ready"
        v-bind="{ loggedIn, logout }"
    />
    <slot
        v-else
        name="placeholder"
    />
</template>

