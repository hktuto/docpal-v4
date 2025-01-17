import didYouMean from 'didyoumean2'
import { set, useMagicKeys, whenever } from '@vueuse/core'

export type GlobalSearchItem = {
    keyword?: string[],
    label: string,
    icon ?:string,
    action: ({
        keyword,
        tabProvide
    }:any) => void
}

export type GlobalSearchList = {
    label: string,
    icon ?:string,
    items: GlobalSearchItem[]
}
export const useGlobalSearchList = () => useState<GlobalSearchList[]>('global-search-list', () => shallowRef([]))
export const useGlobalActionList = () => useState<GlobalSearchList[]>('global-search-list', () => shallowRef([]))

export const useGlobalSearch = ( tabProvide : any) => {
    const list = useGlobalSearchList()
    const opened = ref(false);
    const keywordRef = ref();
    const keyword = ref('')

    /**
     * Selected item index
     * using - to seperate list and item index
     */
    const selectedItemIndex = ref<string>('')

    const displayList = computed(() => {
        // 
        if(!keyword.value ) {
            return list.value
        }
        const result:GlobalSearchList[] = []
        list.value.forEach( (listItem:GlobalSearchList) => {
            let listItemMatchList:GlobalSearchItem[] = [];
            listItem.items.forEach(item => {
                const matchList = didYouMean(keyword.value, item.keyword, {
                    caseSensitive:false,
                    threshold:0.3,
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
                result.push(newItem)
            }
        })

        return result
    })
    


    const keys = useMagicKeys()
    whenever(keys.meta_k, () => {
        opened.value = true;
        console.log("meta_k")
    })

    whenever(keys.enter, () => {
        if(!opened.value) return;
        if(displayList.value.length === 0) return;
        if(!selectedItemIndex.value) return;
        const [listIndex, itemIndex] = selectedItemIndex.value.split('-');
        const item = displayList.value[parseInt(listIndex)].items[parseInt(itemIndex)]
        if(item) {
            item.action()
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

    watch(opened, (newVal) => {
        if(!newVal) {
            keyword.value = ''
        }
    })

    return {
        opened,
        keyword,
        displayList,
        selectedItemIndex
    }


}