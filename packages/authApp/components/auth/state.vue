<script lang="ts" setup>

const { loggedIn, logout, ready  } = useAuth()

const delayReady = ref(false)
watch( loggedIn, (bool) => {
    if(bool) {
        setTimeout(() => delayReady.value = true, 300)
    }
})
</script>

<template>
    <div v-if="ready" class="readyContentContainer">

        <slot
        
        v-bind="{ loggedIn, logout }"
        />
    </div>
    <div v-if="!delayReady" class="placeHolderContainer">
        <slot
        
        name="placeholder"
        />
    </div>
</template>

<style lang="scss" scoped>
.readyContentContainer{
    opacity: 0;
    animation: fadeIn 0.3s linear 0s normal forwards;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30vh);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

