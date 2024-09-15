import { TabLayout, TabPanelContainer } from './../composables/useTab';

export function recursiveGetPanelById(layout:TabLayout|TabPanelContainer, panelId:string):TabPanelContainer | null {
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