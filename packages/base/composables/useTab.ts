
import {useState, recursiveLoopLayout} from '#imports'
import type {TabType, TabPanel, TabPanelContainer,  TabItem, TabLayout, LayoutDirection, TabComponent} from '../utils/tabType'

const useTabLayout = () => useState<TabLayout>('layout', () => ({
    id: "root",
    type: "TabLayout" as TabType,
    parent: "",
    direction: "vertical" as LayoutDirection,
    tabs: []
})
)
export const useDropEventCallback = () => useState<Record<symbol, any>>('tab-panel-drop-event-callback', ()=>({}))
export const useCurrentTargetPanel = () => useState<string>('tab-current-target-panel',() => "")
export const useTabsManager = () => {

    const layout = useTabLayout()
    const allComponents = ref<TabComponent[]>([])
    
    function initLayout(newLayout:TabLayout) {
        
        layout.value = {...newLayout}
        nextTick(() => {
            allComponents.value = recursiveLoopLayout(newLayout, [])
        })
        // loop thought layout and push all components
        
    }

    return {
        allComponents,
        initLayout,
        layout
    }
}


