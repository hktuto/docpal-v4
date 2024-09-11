<script setup lang="ts">
const { menu = []} = defineProps<{ menu?: any[] }>()
</script>

<template>
    <div class="menuContainer">
        <div class="menuHeader">
            <slot name="header"></slot>
        </div>
        <div class="menuBody">
            
        </div>
        <div class="menuFooter">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.menuContainer{
    
}
</style>