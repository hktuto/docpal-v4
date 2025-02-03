<script setup lang="ts" >
import { Splitpanes, Pane } from 'splitpanes'
import { useStorage } from '@vueuse/core'
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const ready = ref(false)
function layoutReadyHandler(){
    ready.value = true
}
const minSize = ref(20)
const userDefineSize = useStorage('app-tab-size', 200) // user define sie in pexel

function updateSize(){
    /**
     *  panel size is based on persentage of window width
     *  sidebar min-width is 200px
     *  calculate the size of panel based on window width
     * 
     */
    const windowWidth = window.innerWidth
    minSize.value = 200 / windowWidth * 100
}

const displayUserDefineSize = computed(() => {
    if(userDefineSize.value > window.innerWidth) return 200 / window.innerWidth * 100;
    return userDefineSize.value / window.innerWidth * 100;

})

function paneResized(sizes:{min:number, max:number, size:number}[]) {
    /**
     * check if sizes length is greater than 1
     * if so, update userDefineSize
     *
     */
    if(sizes.length > 1) {
        const size = sizes[0].size
        const sizeInPixel = window.innerWidth * ( size / 100 )
        userDefineSize.value = sizeInPixel
    }
}

const isMenuStick = computed(() => {
    return tabProvider.menuStick.value
})


onMounted(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
})

</script>

<template>
    <div class="appFullPage" >
        <Teleport v-if="isMenuStick" to="#appSidebar" defer >
            <slot name="sidebar"/>
        </Teleport>
        <div v-else class="absolutionSidebarContainer">
            <div class="absolutionToggler">
                <AppMenuToggle />
            </div>
            <slot name="sidebar" />
        </div>
        <splitpanes vertical @resized="paneResized" :push-other-panes="true" @ready="layoutReadyHandler">
            <Pane v-if="isMenuStick" :min-size="minSize" :size="displayUserDefineSize" width="20" >
                <div id="appSidebar">
                </div>
            </Pane>
            <Pane >
                <div class="appMainContainer">
                    <div class="appContent">
                        <slot />
                    </div>
                </div>
            </Pane>
        </splitpanes>
    </div>
</template>

<style scoped lang="scss">
.appFullPage{
    --page-padding:  0;
    width: 100svw;
    height: 100svh;
    overflow: hidden;
    background: var(--app-bg);
    background-color: var(--app-grey-900);
    -webkit-app-region: drag;
    --panel-border-radius: 0;
}
.appMainContainer{
    -webkit-app-region: drag;
    --container-radius: var(--app-border-radius-l);
    --container-padding: 0px;
    // background-color: var(--app-grey-1000);
    // box-shadow: var(--app-shadow-xl);
    // border-radius: var(--container-radius);
    background: var(--app-grey-1000);
    overflow: hidden;
    padding: var(--app-space-xs);
    height:100%;
}
.appContent{
    height: 100%;
    width:100%;
    position: relative;
    // overflow: hidden;
    z-index: 2;
    -webkit-app-region: no-drag;
}
#appSidebar{
    width: 100%;
    height: 100%;
    padding: var(--app-space-s) 0 var(--app-space-s) var(--app-space-s);
    -webkit-app-region: no-drag;
}
.absolutionSidebarContainer{
    --header-size: calc(30px + var(--app-space-s));
    position: fixed;
    top: var(--app-space-xs);
    left: var(--app-space-xs);
    width: 280px;
    height: calc(100% - var(--app-space-xs) * 2);
    z-index: 45;
    padding: var(--app-space-xs);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    background: rgba(2552,255,255,0.3);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--app-grey-800);
    border-radius: var(--app-border-radius-s);
    transform: translateX(-100%);
    transition: transform .3s ease-in-out;
    &:hover{
        transform: translateX(0);
    }
    &:focus-within{
        transform: translateX(0);
    }
    &:after {
        --extend-width: 20px;
        content: "";
        position: absolute;
        height: 100%;
        width: var(--extend-width);
        top: 0;
        right: calc(var(--extend-width) * -1);
        background: transparent;
    }
    .absolutionToggler{
        position: relative;
        padding: var(--app-space-xs);
        // background: var(--app-grey-1000);
        cursor: pointer;
        z-index: 2;
    }
}
</style>