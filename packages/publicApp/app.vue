<script lang="ts" setup>
import { getLocale } from '~/utils/loading'
const loadState:string = useLoadState()
initPublicLayout()

</script>

<template>
<div class="pageContainer--padding">
    <div v-if="loadState === 'ready'">111
        <NuxtPage />
    </div>
    <div v-else class="loadState-container">
        <div>loadState: {{loadState}}</div>
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
    div {
        font-size: 28px;
    } 
}
.logoContainer{
    // padding: var(--menu-item-padding);
    --icon-size: calc(var(--icon-font-size) + (var(--menu-item-padding) * 2));
}
</style>


