import type { MenuItem } from '#imports'
import {TabManagerKey } from '#imports'

export function setSelectedMenuItem(selectedMenuItem: Ref<any>, displayMenu: any[], expandMenu?: Ref<MenuItem>) {
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
    // get selected menu item from displayMenu, the item may be in children, found the parent item and set it to expandMenu
    const selectedMenu = displayMenu.find(menu => {
      if(menu.name === selectedMenuItem.value.name){
        return true
      }
      if(menu.children) {
        return menu.children.find((child:any) => child.name === selectedMenuItem.value.name) ? true : false
      }
      return false
    })
    if(selectedMenu && expandMenu) {
      expandMenu.value = JSON.parse(JSON.stringify(selectedMenu))
    }
  }

}


