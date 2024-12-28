interface ContextMenuItem {
    visibleMethod:({options, column, row, rowIndex}:any) => boolean
}

export const contextMenuProviderKey  = inject<ContextMenuItem>('contextMenuProvider')