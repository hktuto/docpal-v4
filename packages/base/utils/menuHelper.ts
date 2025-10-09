import type { MenuItem } from '#imports'
import {TabManagerKey } from '#imports'

export function setSelectedMenuItem(selectedMenuItem: Ref<any>, expandMenu: Ref<MenuItem>) {
  const hightLightPanel = useCurrentTargetPanel()
  const layout = useTabLayout()

  const panelIndex = layout.value.findIndex(panel => panel.id === hightLightPanel.value)
  if(panelIndex !== -1) {
      const selected = layout.value[panelIndex].tabs[layout.value[panelIndex].showingTabIndex || 0]
      if(selected) {
          selectedMenuItem.value = selected
      }
  }
  if(selectedMenuItem.value ) {
    expandMenu = JSON.parse(JSON.stringify(selectedMenuItem.value)) || []
  }

}


