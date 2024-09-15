
import {useState} from '#imports'
import { tourEmits } from 'element-plus'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

export type TabItem = {
    id:string,
    label: string,
    component: string
}
export type TabPanel = TabItem[] // tab panel container

type TabType = "TabLayout" | "TabPanel"
type LayoutDirection = "horizontal" | "vertical"

export type TabPanelContainer = {
    id: string
    type: TabType
    minSize?: number,
    maxSize?: number,
    showingTabIndex?: number
    tabs: TabPanel
}

export type TabLayout = {
    id: string,
    type: TabType
    direction: LayoutDirection
    tabs: (TabPanelContainer | TabLayout)[]
}


export const useTabs = () => useState<TabLayout>(() => ({
    id: "root",
    type: "TabLayout" as TabType,
    direction: "vertical" as LayoutDirection,
    tabs: []
}))

type TabComponent = {
    id:string,
    teleportId:string,
    component: string
}

export const exampleLayout:TabLayout = {
    id: "root",
    type: "TabLayout" as TabType,
    direction: "vertical" as LayoutDirection,
    tabs: [
        {
            id:"l0",
            type: "TabLayout" as TabType,
            direction: "horizontal" as LayoutDirection,
            tabs: [
                {
                    id: 'l0-0',
                    type: "TabPanel" as TabType,
                    showingTabIndex:0,
                    tabs: [
                        {
                            id:'demo',
                            label:"demo1",
                            component: 'LazyTabEmpty'
                        },
                        {
                            id:'demo2',
                            label:"demo2",
                            component: 'LazyTabEmpty'
                        }
                    ]
                } as TabPanelContainer,
                {
                    id:'l0-1',
                    type: "TabLayout" as TabType,
                    direction: "vertical" as LayoutDirection,
                    tabs: [
                        {
                            id:'l0-1-0',
                            type: "TabPanel" as TabType,
                            showingTabIndex:0,
                            tabs: [
                                {
                                    id:'demo3',
                                    label:"demo3",
                                    component: 'LazyTabEmpty'
                                }
                            ]
                        }
                    ]
                } as TabLayout
            ]
        },
       { 
            id:"l1",
            type: "TabPanel" as TabType,
            showingTabIndex:0,
            tabs: [
                {
                    id:'demo',
                    label:"demo1",
                    component: 'LazyTabEmpty'
                },
                {
                    id:'demo2',
                    label:"demo2",
                    component: 'LazyTabEmpty'
                }
            ]
        },
        { 
            id:"l2",
            type: "TabPanel" as TabType,
            showingTabIndex:0,
            tabs: [
                {
                    id:'demo3',
                    label:"demo3",
                    component: 'LazyTabEmpty'
                }
            ]
        }
    ]
}

export const useTabsManager = () => {

    const layout = ref<TabLayout>({
        id: "root",
        type: "TabLayout" as TabType,
        direction: "vertical" as LayoutDirection,
        tabs: []
    })
    const allComponents = ref<TabComponent[]>([])
    
    function initLayout(newLayout:TabLayout) {
        
        layout.value = {...newLayout}
        nextTick(() => {
            allComponents.value = recursiveLoopLayout(newLayout, [])
            console.log("initLayout", allComponents.value)
        })
        // loop thought layout and push all components
        
    }

    return {
        allComponents,
        initLayout,
        layout
    }
}

function recursiveLoopLayout(layout:TabLayout, components:TabComponent[]) {
    let allComponents = components
    if(layout.tabs) {
        layout.tabs.forEach(tab => {
            if(tab.type === 'TabLayout') {
                recursiveLoopLayout((tab as TabLayout), components)
            } else if(tab.type === 'TabPanel') {
                const tabPanel = tab as TabPanelContainer
                tabPanel.tabs.forEach( (component, index) => {
                    allComponents.push({id:component.id, teleportId:'#'+tabPanel.id+'-'+component.id, component: component.component})
                })
            }
        })
    }
    return allComponents
}