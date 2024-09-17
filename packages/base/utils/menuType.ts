export interface MenuItem {
    icon:string,
    label: string,
    draggable: boolean,
    draggleSetting?: any,
    actions?: any
    children?: MenuItem[]
}