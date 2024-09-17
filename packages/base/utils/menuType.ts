

export interface MenuItem {
    id:string,
    icon:string,
    label: string,
    draggable: boolean,
    draggleSetting?: any,
    component?: string
    actions?: any
    children?: MenuItem[]
}

