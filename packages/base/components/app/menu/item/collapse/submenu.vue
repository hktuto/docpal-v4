<script lang="ts" setup>
const { subMenuItem } = defineProps<{ subMenuItem: MenuItem }>()

const opened = ref(false)
</script>

<template>
<div class="subMenuItem">
    <div class="header">
        <Icon v-if="subMenuItem.icon" :name="subMenuItem.icon" />
        <span class="label">{{ subMenuItem.label }}</span>
        <Icon v-if="subMenuItem.inlineRender" :name="opened ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="toggler" @click="opened = !opened" />
    </div>
    <template v-if="subMenuItem.inlineRender && opened">
        <Suspense>
            <component :is="resolveComponent(subMenuItem.component)" :tab="subMenuItem" />
            <template #fallback>
                <div class="loadingContainer">
                    <div class="loadingbar gradient"></div>
                    {{ $t('loading') }}
                </div>
            </template>
        </Suspense>
    </template>
</div>
</template>

<style lang="scss" scoped>
.subMenuItem{
    font-size: var(--app-font-size-m);
    color: var(--app-grey-500);
}
.header{
        width:100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding-block: var(--app-space-xs);
        gap:var(--app-space-xs);
        cursor: pointer;
       
        .label{
            flex: 1 0 auto;
        }
    }

    .loadingContainer{
        position:absolute;
        width:100%;
        height: 100%;
        display: grid;
        place-items: center;
    }
    .loadingbar{
        width: 100%;
        height: 5px;
        position: absolute;
        top: 0;
        left: 0;
        animation: rotate 3s infinite linear;
        -webkit-animation: rotate 3s infinite linear;
    }

.gradient {
    background: var(--app-grey-800); /* Old browsers */
    background: linear-gradient(to right,  var(--app-primary-6) 0%,var(--app-primary-3) 25%,var(--app-success-3) 50%,var(--app-success-1) 75%, var(--app-primary-3) 100%); /* W3C */

}
@keyframes rotate {
  from {
    background-position: -3000px;
  }
  to { 
    background-position: 0px;
  }
}
</style>