
import {useState} from '#imports'
import type {TabType, TabPanel, TabItem, TabLayout, LayoutDirection, TabComponent} from '../components/tab/type'

export const exampleLayout:TabLayout = {
    id: "root",
    type: "TabLayout" as TabType,
    parent: "",
    direction: "vertical" as LayoutDirection,
    tabs: [
        {
            id: 'l0',
            type: "TabPanel" as TabType,
            parent: "root",
            showingTabIndex:0,
            tabs: [
                {
                    id:'demo',
                    label:"demo1",
                    parent:"l0",
                    component: 'LazyTabEmpty'
                },
                {
                    id:'demo2',
                    label:"demo2",
                    parent:"l0",
                    component: 'LazyTabEmpty'
                }
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
                tabPanel.tabs.forEach( (component:TabItem, index:number) => {
                    allComponents.push({id:component.id, parent:component.parent, teleportId:tabPanel.id+'-'+component.id, component: component.component})
                })
            }
        })
    }
    return allComponents
}
