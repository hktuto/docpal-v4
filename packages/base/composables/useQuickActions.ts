import didYouMean from 'didyoumean2'
import { set, useMagicKeys, whenever } from '@vueuse/core'
import { watchDebounced } from '@vueuse/core'
export type GlobalSearchItem = {
    keyword: string[], // if no visibleFn is provide, use keyword to calculate should item show or not
    label: string, // function to set the label
    labelFn?: (keyword:string) => string, // function to set the label in html format, if present, label will be ignore
    icon ?:string, // icon show in quick action dialog
    visibleFn?: (keyword:string) => Promise<GlobalSearchItem[] | void> // function to set item visivle or not 
    action: ({
        keyword,
        tabProvide
    }:any) => void // action when item click
}

/**
 * 
 */
export type GlobalSearchList = {
    label: string,
    icon ?:string,
    items: GlobalSearchItem[]
}
export const useGlobalSearchList = () => useState<GlobalSearchList[]>('global-search-list', () => shallowRef([]))
export const useGlobalActionList = () => useState<GlobalSearchList[]>('global-action-list', () => shallowRef([]))

export const useGlobalSearch = ( tabProvide : any) => {
    const list = useGlobalSearchList()
    const actionList = useGlobalActionList()
    const opened = ref(false);
    const keywordRef = ref();
    const keyword = ref('')

    
    const tabProvider = inject(TabManagerKey)
    if(!tabProvider) {
        throw createError('tab manger not found')
    }

    /**
     * Selected item index
     * using - to seperate list and item index
     */
    const selectedItemIndex = ref<string>('')

    const displayList = ref<GlobalSearchList[]>([]);
    

    async function calculateDisplayList(){        // reset display list
        displayList.value = []
        
        // calcuate menu list
        list.value.forEach( (listItem:GlobalSearchList) => {
            let listItemMatchList:GlobalSearchItem[] = [];
            listItem.items.forEach(item => {
                const matchList = didYouMean(keyword.value, item.keyword, {
                    caseSensitive:false,
                    threshold:0.4,
                })
                const contains = item.keyword.some(k => keyword.value.includes(k))
                if(matchList && matchList.length > 0 || contains) {
                    listItemMatchList.push(item)
                }
            })
            if(listItemMatchList.length > 0) {
                const newItem:GlobalSearchList = {
                    label: listItem.label,
                    items: listItemMatchList
                }
                displayList.value.push(newItem)
            }
        })
        // calcuate action list
        for (const action of actionList.value) {
            action.items.forEach( async (item) => {
                const visibleItems = await item.visibleFn?.(keyword.value)
                
                if(visibleItems && visibleItems.length > 0) {
                    // check if displayList already has this item
                    const displayItem = displayList.value.find((item) => item.label === action.label)
                    if(displayItem) {
                        displayItem.items.push(...visibleItems)
                        return;
                    }else{
                        displayList.value.push({
                            label: action.label,
                            icon: action.icon,
                            items: visibleItems
                        })
                    }
                }
            })
            
        }
        console.log("actionList", actionList.value)
    }

    function itemClick(item:GlobalSearchItem) {
        if(item.action) {
            item.action({
                keyword: keyword.value,
                tabProvider,
            })
        }
    }

    const keys = useMagicKeys({
        passive:false,
        onEventFired: (e) => {
            if (keys['meta_k'].value || keys['ctrl_k'].value) {
                e.preventDefault();
            }
        }
    })

    whenever(keys.meta_k, (e) => {
        opened.value = true;
    })

    whenever(keys.ctrl_k, (e) => {
        opened.value = true;
    })

    whenever(keys.enter, () => {
        if(!opened.value) return;
        if(displayList.value.length === 0) return;
        if(!selectedItemIndex.value) return;
        const [listIndex, itemIndex] = selectedItemIndex.value.split('-');
        const item = displayList.value[parseInt(listIndex)].items[parseInt(itemIndex)]
        if(item) {
            itemClick(item)
        }
        opened.value = false
    })
    whenever(keys.arrowdown, () => {
        if(!opened.value) return;
        if(displayList.value.length === 0) return;
        // se
        // check if selectedItemInex is valid, and if not, set it to 0
        if(selectedItemIndex.value === '') selectedItemIndex.value = '0-0'
        const [listIndex, itemIndex] = selectedItemIndex.value.split('-');
        // check if itemIndex is valid and has next item
        if( parseInt(itemIndex) + 1 < displayList.value[parseInt(listIndex)].items.length) {
            selectedItemIndex.value = listIndex + '-' + (parseInt(itemIndex) + 1).toString()
            return;
            // if yes, set it
        }
        // check if listIndex is valid and has next list
        if( parseInt(listIndex) + 1 < displayList.value.length) {
            selectedItemIndex.value = (parseInt(listIndex) + 1).toString() + '-0'
            return;
        }
        selectedItemIndex.value = '0-0';

    })
    whenever(keys.arrowup, () => {
        if(!opened.value) return;
        if(displayList.value.length === 0) return;
        if(selectedItemIndex.value === '') selectedItemIndex.value = (displayList.value.length -1) + '-' + (displayList.value[displayList.value.length - 1].items.length - 1);
        const [listIndex, itemIndex] = selectedItemIndex.value.split('-');
        // check if itemIndex is valid and has previous item
        if(parseInt(itemIndex) !== 0) {
            selectedItemIndex.value = listIndex + '-' + (parseInt(itemIndex) - 1).toString()
            return;
        }
        // check if listIndex is valid and has previous list
        if(parseInt(listIndex) !== 0) {
            selectedItemIndex.value = (parseInt(listIndex) - 1).toString() + '-' + (displayList.value[parseInt(listIndex) - 1].items.length - 1).toString()
            return;
        }
        selectedItemIndex.value = (displayList.value.length -1) + '-' + (displayList.value[displayList.value.length - 1].items.length - 1);
    })

    watch(selectedItemIndex, (newVal) => {
        if(!opened.value) return;
        const selectedElement = document.querySelector('.item-' + newVal)
        if(selectedElement) {
            selectedElement.scrollIntoView({behavior: 'smooth', block: 'nearest'})
        }
    })

    watchDebounced(keyword, async (newVal) => {
        if(!newVal) {
            displayList.value = [...list.value]
            console.log(displayList.value)
            return;
        }
        await calculateDisplayList()
    },{
        debounce: 100,
        maxWait: 500,
    })

    watch(opened, (newVal) => {
        if(!newVal) {
            keyword.value = ''
        }else{
            if(!keyword.value) {
                displayList.value = [...list.value]
            }
        }
    })

    return {
        opened,
        keyword,
        displayList,
        selectedItemIndex,
        itemClick
    }


}
