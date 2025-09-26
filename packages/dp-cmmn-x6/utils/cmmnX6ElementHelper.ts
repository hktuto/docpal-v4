
// Region Node Element helper
import type {CaseItemType} from "./cmmn";
import {Cell, CellView, Edge} from "@antv/x6";

export const taskSize = 80
export const eventSize = 40
export const criterionSize = 30
export const taskLabel = {
    textAnchor: 'center',
    textAlign: 'center',
    textVerticalAnchor: 'top',
    refX: 0,
    y : taskSize / 2 + 5,
    fill: '#000',
    textWrap: {
        width: -0, // 宽度减少 10px
        ellipsis: true,  // 文本超出显示范围时，自动添加省略号
        breakWord: true, // 是否截断单词
    }
}
export const iconOptionMaker = (iconPath:string) => {
    return {
        'xlink:href': iconPath,
        refWidth: 0.7,
        refHeight: 0.7,
        refX: 0.15,
        refY: 0.15
    }
}
export const makeTaskStyle = (color:string, img:string) => {
    const style:any = {
        width: taskSize,
        height: taskSize,
        attrs: {
            body: {
                stroke: color,
                strokeWidth: 1,
                fill: color,
                rx: 8,
                ry: 8,
                refWidth: 1,
                refHeight: 1,
            },
            label:taskLabel
        },
        markup: [
            {
                tagName: 'rect',
                selector: 'body'
            },
            {
                tagName: 'text',
                selector: 'label'
            },
            
        ]
    }
    if(img) {
        style.attrs.image = iconOptionMaker(img)
        style.markup.push({
            tagName: 'image',
            selector: 'image'
        })
    }

    return style
}
// End Region

export type NodeSetting = {
    [key in CaseItemType]:NodeSettingItem
}
export type ConnectionRuleArgs = {sourceCell: CellView, targetCell: CellView}
export type EmbeddingRuleArgs =  {child:Cell,parent:Cell,childView:CellView, parentView:CellView}
export type NodeSettingItem = {
    nodeStyle: any, // 基本的 Node 設定
    embed?: boolean, // 是否可以嵌入
    embeddingValidateRule?: (arg: EmbeddingRuleArgs) => boolean, // 嵌入規則

    connectable?: boolean, // 是否可連結
    connectRule?: (args: ConnectionRuleArgs) => boolean, // 連結規則

    showInToolBar: boolean // 是否顯示在工具列
    toolBarIcon?:string // 工具列圖標
    toolBarLabel?:string // 工具列標籤
    toolDraggable?:boolean // 工具列是否可拖到 Graph
    nodeDragStyle?:any, // 节点拖動時的樣式

    newNodeData?: (id:string, planId:string, label:string) => any

    clickHandler?: (args: {node?:Cell,view:CellView,edge?:Edge}) => void
}

export const createClickButton = (node:Cell) => {
    // add backdrop
    const radius = (node.attrs.body.rx || 1 )* 1.4
    const width = node.size().width as any || 100;
    node.addTools([
        {
            name: 'boundary',
            args: {
                attrs: {
                    fill: '#000000',
                    fillOpacity: 0.1,
                    padding: 4,
                    'stroke-width': 0,
                    rx: radius,
                    ry: radius
                },
            },
        },
        {
            name:'button',
            args:{
                x: 0,
                y: 0,
                markup:[
                    {
                        tagName: 'rect',
                        selector: 'button',
                        attrs: {
                            width: 16,
                            height: 16,
                            rx: 8,
                            ry: 8,
                            fill: 'white',
                            cursor: 'pointer',
                        },
                    },
                    {
                        tagName:'image',
                        selector:'image',
                        attrs: {
                            width: 16,
                            height: 16,
                            'xlink:href':'/icons/menu.svg',
                            cursor: 'pointer',
                        },
                    }
                ],
                onClick(args:any) {
                    const ev = new CustomEvent('cmmn-node-contextMenu-open', {detail: args})
                    window.dispatchEvent(ev)
                },
            },
        },

    ])
}
