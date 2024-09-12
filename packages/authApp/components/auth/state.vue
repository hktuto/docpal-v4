<script lang="ts" setup>

const { loggedIn, user, logout, ready  } = useAuth()

</script>

<template>
    <slot
        v-if="ready"
        v-bind="{ loggedIn, user, logout }"
    />
    <slot
        v-else
        name="placeholder"
    />
</template>

