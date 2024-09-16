
import {useState} from '#imports'
import type {TabType, TabPanel, TabPanelContainer,  TabItem, TabLayout, LayoutDirection, TabComponent} from '../components/tab/type'

export const exampleLayout:TabLayout = {
    id: "root",
    type: "TabLayout" as TabType,
    parent: "",
    direction: "vertical" as LayoutDirection,
    tabs: [
        {
            id: 'l10',
            type: "TabLayout" as TabType,
            parent: "root",
            direction : "horizontal"  as LayoutDirection,
            tabs: [
                {
                    id: 'l10-0',
                    type: "TabPanel" as TabType,
                    parent: "l10",
                    showingTabIndex:0,
                    tabs:[
                        {
                            id:'demo-0-0',
                            label:"demo-0-0",
                            parent:"l10-0",
                            component: 'LazyTabEmpty'
                        },
                        {
                            id:'demo-0-1',
                            label:"demo-0-1",
                            parent:"l10-0",
                            component: 'LazyTabEmpty'
                        },
                    ]
                },
                {
                    id: 'l10-2',
                    type: "TabPanel" as TabType,
                    parent: "l10",
                    showingTabIndex:0,
                    tabs:[
                        {
                            id:'demo-1-0',
                            label:"demo-1-0",
                            parent:"l10-2",
                            component: 'LazyTabEmpty'
                        },
                        {
                            id:'demo-1-1',
                            label:"demo-1-1",
                            parent:"l10-2",
                            component: 'LazyTabEmpty'
                        },
                    ]
                }
            ]
        },
        {
            id: 'l0',
            type: "TabPanel" as TabType,
            parent: "root",
            showingTabIndex:0,
            tabs: [
                {
                    id:'demo-0',
                    label:"demo-0",
                    parent:"l0",
                    component: 'LazyTabEmpty'
                },
                {
                    id:'demo-1',
                    label:"demo-1",
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
                    id:'demo-2',
                    label:"demo-2",
                    parent: "l1",
                    component: 'LazyTabEmpty'
                },
                {
                    id:'demo-3',
                    label:"demo-3",
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
                    id:'demo-4',
                    label:"demo-4",
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
