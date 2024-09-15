
import {useState} from '#imports'

export type TabItem = {
    id:string,
    label: string,
    parent:string
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
    parent:string
    showingTabIndex?: number
    tabs: TabPanel
}

export type TabLayout = {
    id: string,
    type: TabType
    parent:string
    direction: LayoutDirection
    tabs: (TabPanelContainer | TabLayout)[]
}


export const useTabs = () => useState<TabLayout>(() => ({
    id: "root",
    type: "TabLayout" as TabType,
    parent: "",
    direction: "vertical" as LayoutDirection,
    tabs: []
}))

type TabComponent = {
    id:string,
    parent:string
    teleportId:string,
    component: string
}

export const exampleLayout:TabLayout = {
    id: "root",
    type: "TabLayout" as TabType,
    parent: "",
    direction: "vertical" as LayoutDirection,
    tabs: [
        {
            id:"l0",
            type: "TabLayout" as TabType,
            parent: "root",
            direction: "horizontal" as LayoutDirection,
            tabs: [
                {
                    id: 'l0-0',
                    type: "TabPanel" as TabType,
                    parent: "l0",
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
                    parent: "l0",
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
            parent: "root",
            tabs: [
                {
                    id:'demo',
                    label:"demo1",
                    parent: "l1",
                    component: 'LazyTabEmpty'
                },
                {
                    id:'demo2',
                    label:"demo2",
                    parent: "l1",
                    component: 'LazyTabEmpty'
                }
            ]
        },
        { 
            id:"l2",
            type: "TabPanel" as TabType,
            parent: "root",
            showingTabIndex:0,
            tabs: [
                {
                    id:'demo3',
                    label:"demo3",
                    parent: "l2",
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
        parent: "",
        direction: "vertical" as LayoutDirection,
        tabs: []
    })
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

function recursiveLoopLayout(layout:TabLayout, components:TabComponent[]) {
    let allComponents = components
    if(layout.tabs) {
        layout.tabs.forEach(tab => {
            if(tab.type === 'TabLayout') {
                recursiveLoopLayout((tab as TabLayout), components)
            } else if(tab.type === 'TabPanel') {
                const tabPanel = tab as TabPanelContainer
                tabPanel.tabs.forEach( (component, index) => {
                    allComponents.push({id:component.id, parent:component.parent, teleportId:'#'+tabPanel.id+'-'+component.id, component: component.component})
                })
            }
        })
    }
    return allComponents
}
