


export const useTableContextmenu = (
    containerRef:Ref<HTMLElement | undefined>, 
    isChild:boolean = false, 
    defaultDirection:'left' | 'right' = 'right'
) => {

    const visible = ref(false);
    const position = ref<any>({x:0, y:0})
    const menuItemHeight = 26;

    const items = ref<any>([])

    const openDirection = ref<'left' | 'right'>(defaultDirection)
    
    function getMaxWidth(){
        let maxWidth = 0;
        items.value.forEach((item:TableMenuActions) => {
            let itemWidth = item.name.length * 10
            if(item.children && item.children.length > 0) {
                // add icon width
                itemWidth += 20
            }
            if(item.prefixConfig && item.prefixConfig.icon) {
                itemWidth += 20
            }
            if(itemWidth > maxWidth) {
                maxWidth = itemWidth
            }
        })
        return maxWidth 
    }

    function calculateChildPostion(){
        const {x, y} = position.value
        // get parent position
        const parentPosition = container.parentElement?.getBoundingClientRect()
        const maxWidth = getMaxWidth()
        if(!parentPosition) return
        // calculate left postion
        // if defaultDirection left, then check if container can place to parent left, otherwise place to parent right
        let left;
        if(openDirection.value === 'left'){
           

        }

        // calculate the total height of actions
        const totoalActionHeight = items.value.length * menuItemHeight;// 40 is the height of each action
        // check if the top position is out of the screen
        const top = y + totoalActionHeight > parentPosition.bottom ? y - totoalActionHeight : y
        // set postion to container
        container.style.left = left + 'px'
        container.style.top = top + 'px'
        visible.value = true
    }

    function calculateRootPostion(){
        if(!containerRef.value) return
        const {x, y} = position.value
        const maxWidth = getMaxWidth()
        const left = x + maxWidth > window.innerWidth ? x - maxWidth : x
        // calculate the total height of actions
        const totoalActionHeight = items.value.length * menuItemHeight;// 40 is the height of each action
        // check if the top position is out of the screen
        const top = y + totoalActionHeight > window.innerHeight ? y - totoalActionHeight : y
        // set postion to container
        containerRef.value.style.left = left + 'px'
        containerRef.value.style.top = top + 'px'
        visible.value = true
    }

    function open({x, y}:any){
        position.value = {x,y}
        if(!isChild){
            calculateRootPostion()
        }else{
            calculateChildPostion()
        }
    }

    function close(){
        visible.value = false
    }

    return {
        visible,
        items,
        open,
        close,
        openDirection,
    }
}
