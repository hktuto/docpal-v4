
export enum EventType {
    TABLE_CONTEXT_MENU_OPEN = 'table-context-menu-open', // open table action column dialog
    TABLE_CONTEXT_MENU_CLOSE = 'table-context-menu-close', // close table action column dialog
    USER_PREFERENCE_CHANGE__TIME = 'user-preference-change--time', // user preference changed
    USER_LOGIN__SUCCESS = 'user-login--success',
    USER_LOGIN__EXPIRE = 'user-login--expire',
    FILE_NEED_REFRESH = "FILE_NEED_REFRESH",
    
}

export type TABLE_CONTEXT_PARAMS = {
    row:any,
    column:any,
    rowIndex:number,
    options:TableMenuActions[][],
    event:MouseEvent
}




