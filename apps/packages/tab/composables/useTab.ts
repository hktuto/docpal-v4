
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
    showingTabIndex: number
    tabs: TabPanel
}

export type TabLayout = {
    id: string,
    type: TabType
    direction: LayoutDirection
    tabs: TabLayout[] | TabPanelContainer[]
}


export const useTabs = () => useState<TabLayout>(() => ({
    id: "root",
    type: "TabLayout" as TabType,
    direction: "vertical" as LayoutDirection,
    deep:0,
    tabs: [
       { 
            id:"default",
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
            id:"default2",
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
}))