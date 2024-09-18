/**
 *  This page container all type use in Tab and Drop
 * 
 */

/**
 * 所布可以 drop 物件的最小單位
 */
interface DropableItem {
    id:string,
    icon?:string,
    label:string,
    component: string,
    props: Record<string, any>
}
