import {Cell, CellView, Graph, View} from "@antv/x6";
import {nodeSetting} from "./cmmnX6Elements";
// global key Stoke is pressed
let ctrlPressed = false

let globalGraph:any;



export const registerGraphEvents = (graph:Graph, isReadOnly = false) => {
    globalGraph = graph
    graph.on('node:change:position', positionChangeEvent)
    graph.on('node:embedding', embeddingRule)
    graph.on('node:embedded', embeddedRule)
    graph.on('node:click', nodeClickRule)
    if(!isReadOnly) {

        graph.on('node:contextmenu',nodeContextMenu);
        graph.on('node:change:size', sizeChangeRule)
        // graph.on('edge:change:source', edgeConnectRule)
        graph.on('edge:mouseenter', ({cell}:any) => {
            cell.addTools([
                {
                    name: 'vertices',
                    args: {
                        attrs: { fill: '#666' },
                    },
                },
                {
                    name: 'button-remove',
                    args:{
                        distance: -20
                    }
                }
            ])
        })
        graph.on('edge:mouseleave', ({cell}:any) => {
            cell.removeTools()
        })
        graph.on('edge:removed', (args) => edgeRemovedRule(args, graph))
        graph.on('edge:connected', edgeConnectedChangeRule)
    }
    graph.on('blank:click', blankClickRule)
}

const edgeConnectedChangeRule = ({isNew,edge}:any) => {
    const targetNode = edge.getTargetCell()
    const sourceNode = edge.getSourceNode()
    console.log("edgeConnectedChangeRule", targetNode, sourceNode)
    targetNode.data.sentry.data.planItemOnPart.attr_sourceRef = targetNode.id;
}
const edgeRemovedRule = ({edge, index, options}, graph:Graph) => {
    
    const targetNode = graph.getCellById(edge.target.cell)
    if(targetNode){
        delete targetNode.data.sentry.data.planItemOnPart;
    }
}



export const allowConnectToNode = ({sourceCell, targetCell})=> {
    const sourceData = sourceCell.data
    const targetData = targetCell.data
    
    if(!sourceData || !targetData){
        // can not connect to null
        return false
    }
    if(sourceData.type === 'exitCriterion' || sourceData.type === 'entryCriterion'){
        // source can not be entryCriterion or exitCriterion
        return false
    }
    if(sourceCell.id === targetCell.parent.id){
        // can not connect to self
        return false
    }
    // can not connect to parent
    return !checkAllParentsWithType(targetCell, sourceData.type);
    
    // console.log("allowConnectToNode", args)
}

const checkAllParentsWithType = (cell:Cell, type:string) => {
    const parent = cell.getParent()
    if(parent && parent.isNode()){
        if(parent.data.type === type){
            return true
        }
        return checkAllParentsWithType(parent, type)
    }
    return false
}

export const embeddingValidateRule =(args:{child:Cell,parent:Cell,childView:CellView, parentView:CellView}) => {
    const {child, parent, childView, parentView} = args

    if(!child.data || !parent.data){
        console.log("no data", child.data, parent.data)
        return false
    }
    const { type : childType} = child.data
    return nodeSetting[childType].embeddingValidateRule(args)
    
}

export type PositionChangeEventOption = {
    node:Cell,
    options: Graph.Options
}


export const embeddingRule = ({e}) => {
    ctrlPressed = e.metaKey || e.ctrlKey
}

export const embeddedRule = ({node,currentParent}) => {
    ctrlPressed = false
    const currentZIndex = currentParent.zIndex
    
    node.zIndex = currentParent.zIndex + 1;
    // loop node children
    loopChildrenAndUpdateZIndex(node, currentZIndex + 1 )
    if(node.data.type === 'entryCriterion' || node.data.type === 'exitCriterion') {
        snapCriterionToParent(node)
        node.setData({
            ...node.data,
            planItem: currentParent.data.planItem
        })
    }
}

function loopChildrenAndUpdateZIndex(node:Cell, index = 0) {
    const children = node.getChildren()
    if(children && children.length > 0) {
        children.forEach((child) => {
            child.zIndex = index + 1
            loopChildrenAndUpdateZIndex(child, index + 1)
        })
    }
}


// disable entryCriterion , exitCriterion and stage to drag outside of parent
export const cmmnDragRule = (view:View) => {
    resetToolsAndCloseContextmenu()
    const cell = view.cell as Cell
    if (cell.isNode()) {
        const {type} = cell.data
        
        if(type === 'case') {
            return null
        }
        if(type === 'stage') {
            if(parent) {
                return null
            }
        }
        if(type === 'exitCriterion' || type === 'entryCriterion') {
            const parent = cell.getParent()
            if(parent) {
                const box = parent.getBBox().inflate(20,20)
                return box
            }
            
        }
        
    }

    return null
}


export const nodeResizingRule = (node: Cell) => (node.data && node.data.type === 'stage' || node.data.type === 'case')
export const sizeChangeRule = ({ node, options }) => {
    const children = node.getChildren()
    if (children && children.length) {
        node.prop('originSize', node.getSize())
        // 看看子項有沒有 exit 或 entry ，有的話，修改 exit 和 entry 的位置
        children.forEach((child) => {
            if(!child.data || !child.data.type) {
                return
            }
            if ((child.data.type === 'entryCriterion' || child.data.type === 'exitCriterion')) {
                snapCriterionToParent(child)
                // console.log("sizeChangeRule", child)


            }
        })
    }
}

function snapCriterionToParent(child:Cell){
    if(!child || !child.isNode() || !child.getParent()) {
        return
    }
    const parentNode = child.getParent()
    const parentSize = parentNode.size()
    const childSize = child.size()
    const childRelativePosition = child.getPosition({relative:true})
    // 看 child 的位置比較接近父級的那一邊，就調整 child 的位置
    const newRelativePosition = {
        x: childRelativePosition.x  < - childSize.width / 2 ? 0 : childRelativePosition.x > parentSize.width ? parentSize.width + childSize.width / 2 : childRelativePosition.x,
        y: childRelativePosition.y < - childSize.height / 2 ? 0 : childRelativePosition.y > parentSize.height ? parentSize.height + childSize.height / 2 : childRelativePosition.y
    }
    // calculate childRelativePosition.x or childRelativePosition.y is more close to parent edge, then  snap the closest edge to parent edge
    const xRelativeToEdge = newRelativePosition.x > parentSize.width / 2 ? Math.abs(parentSize.width - newRelativePosition.x) : Math.abs(newRelativePosition.x);
    const yRelativeToEdge = newRelativePosition.y > parentSize.height / 2 ? Math.abs(parentSize.height - newRelativePosition.y) : Math.abs(newRelativePosition.y);

    if(xRelativeToEdge < yRelativeToEdge) {
        newRelativePosition.x = childRelativePosition.x  < parentSize.width /2 ? -childSize.width / 2 : parentSize.width - childSize.width / 2
    } else {
        newRelativePosition.y = childRelativePosition.y  < parentSize.height /2 ? -childSize.height / 2 : parentSize.height - childSize.height / 2
    }
    child.prop(
        { skipParentHandler: true },
    )
    child.position(newRelativePosition.x, newRelativePosition.y, {relative:true})
}

export const positionChangeEvent = ({node, options}:PositionChangeEventOption) => {


    const children = node.getChildren()
    // if (children && children.length) {
    //     node.prop('originPosition', node.getPosition())
    // }
    // if(node.data.type !== 'entryCriterion' && node.data.type !== 'exitCriterion') {
    //     // resizeParent(node)
    // }
    
    if(node.data && node.data.type === 'exitCriterion' || node.data.type === 'entryCriterion') {
        snapCriterionToParent(node)
    }
}


export const resizeParent = (node:Cell) => {
    const parent = node.getParent()
    if (parent && parent.isNode()) {
        let originSize = parent.prop('originSize')
        if (originSize == null) {
            originSize = parent.getSize()
            parent.prop('originSize', originSize)
        }

        let originPosition = parent.prop('originPosition')
        if (originPosition == null) {
            originPosition = parent.getPosition()
            parent.prop('originPosition', originPosition)
        }

        let x = originPosition.x
        let y = originPosition.y
        let cornerX = originPosition.x + originSize.width
        let cornerY = originPosition.y + originSize.height
        let hasChange = false
        const children = parent.getChildren()
        if (children) {
            children.forEach((child) => {
                
                if(!child.data || !child.data.type || child.data.type === 'entryCriterion' || child.data.type === 'exitCriterion' || child.data.type === 'edge') {
                    return
                }
                const bbox = child.getBBox().inflate(24)
                const corner = bbox.getCorner()

                if (bbox.x < x) {
                    x = bbox.x
                    hasChange = true
                }

                if (bbox.y < y) {
                    y = bbox.y
                    hasChange = true
                }

                if (corner.x > cornerX) {
                    cornerX = corner.x
                    hasChange = true
                }

                if (corner.y > cornerY) {
                    cornerY = corner.y
                    hasChange = true
                }
            })
        }

        if (hasChange) {
            parent.prop(
                {
                    position: { x, y },
                    size: { width: cornerX - x, height: cornerY - y },
                },
                { skipParentHandler: true },
            )
        }
        
        
        
    }

}



export const nodeContextMenu = (args:any) => {
    resetToolsAndCloseContextmenu()
    if(args.node.isNode()){
        const {type} = args.node.data;
        resetToolsAndCloseContextmenu()
        nodeSetting[type].clickHandler(args)
        
    }
    const ev = new CustomEvent('cmmn-node-contextMenu-open', {detail: args})
    window.dispatchEvent(ev)
}
export const nodeClickRule = ({node,view}:{node:Cell, view:Cell}) => {
    const ev = new CustomEvent('cmmn-node-click', {detail: node})
    window.dispatchEvent(ev)
    if(node.isNode()){
        const {type} = node.data;

        resetToolsAndCloseContextmenu()
        nodeSetting[type].clickHandler({node, view})
        
        
    }
}

export const resetToolsAndCloseContextmenu = () => {
    const ev = new CustomEvent('cmmn-node-contextMenu-close', )
    window.dispatchEvent(ev) 
    // remove all tools
    globalGraph.getEdges().forEach((edge) => {
        edge.removeTools()
    })
    globalGraph.getCells().forEach((cell) => {
        if(cell.isNode()){
            // remove backdrop
            cell.removeTools()
        }
    })
}

export const blankClickRule = () => {
    // console.log("blankClickRule")
    const ev = new CustomEvent('cmmn-node-click', )
    window.dispatchEvent(ev)
    // remove all tools
    resetToolsAndCloseContextmenu()
}
