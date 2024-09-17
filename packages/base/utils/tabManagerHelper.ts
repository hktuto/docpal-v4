import type { TabLayout, TabPanelContainer, TabComponent, TabItem } from './tabType';

export function recursiveGetPanelById(layout:TabLayout|TabPanelContainer, panelId:string):(TabPanelContainer | TabLayout) | null {
    if(layout.id === panelId) {
        return layout as TabPanelContainer
    }
    if (layout.tabs) {
        for (let i = 0; i < layout.tabs.length; i++) {
            const item = layout.tabs[i] as TabLayout|TabPanelContainer
            if(item.type === 'TabLayout') {
                let found:any = recursiveGetPanelById((layout.tabs[i] as TabLayout), panelId)
                if(found) {
                    return found
                }
            } else {
                const tabPanel = layout.tabs[i] as TabPanelContainer
                if(tabPanel.id === panelId) {
                    return tabPanel
                }
            }
        }
    }

    return null;
    
}

export function recursiveLoopLayout(layout:TabLayout, components:TabComponent[]) {
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