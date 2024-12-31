interface ContextMenuList {
    selectItem:(item:TableMenuActions) => void
    selectedItem: Ref<TableMenuActions,TableMenuActions>
}

export const ContextMenuListKey  = inject<ContextMenuList>('contextMenuListProvider')

