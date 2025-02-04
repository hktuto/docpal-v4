
import {GlobalPasteEvent, useEventBus} from 'eventbus';

export const useDisplayTimeFormat = () => useState('display-time-format', () => 'YYYY-MM-DD')



export const useLastClipboard = () => useState('last-clipboard', () => '')

export const useGlobalSetting = () => {
    const lastClipboard = useLastClipboard()

        // global bus event 
    const fontSizeBus = useEventBus<string>(EventType.USER_PREFERENCE_CHANGE__TIME)

    function handleDocumentFocus() {
        console.log('Document is focused');
        checkClicpBoard()
    }
    async function checkClicpBoard(){
        // check document is focused
        if(!document.hasFocus()) return
        console.log("check document is focused")
        const clipboardText = await navigator.clipboard.readText()
        console.log("clipboardText", clipboardText)
        // make sure clipboard function only run once on each clipboard text
        if(clipboardText === lastClipboard.value) {
            console.log("old clipboard is same as new clipboard")
            return
        }
        lastClipboard.value = clipboardText
        // check clipboardText is valid json
        try {
            // check if clipboardText is a url and the origin is same as current page
            // if url is not valid, throw error
            await decodeUrlActions(clipboardText)
            //  check if url is same as current page
            
        } catch (error) {
            // do nothing
            console.log("error", error)
        }
    }

    async function decodeUrlActions(url:string) {
        const newUrl = new URL(url)
        if(newUrl.origin !== location.origin) {
            throw new Error('Invalid URL')
        }
        console.log("url is valid")
        // get actions from query string
        const actions = newUrl.searchParams.get('actions')
        console.log("actions", actions)
        if(!actions) return
        const clipboardData = JSON.parse(atob(actions))
        console.log("actionsObj", clipboardData)
        // check clipboardData.type is include in GlobalPasteEvent
        if(Object.values(GlobalPasteEvent).includes(clipboardData.type)){
            console.log(clipboardData.type)
            const bus = useEventBus(clipboardData.type)
            navigator.clipboard.writeText("")
            bus.emit(clipboardData.data)
        }
        // clean up url
        const route = useRoute()
        route.query = {}
    }

    function handleTimeSettingChange(newValue:string) {
        console.log("time setting change", newValue)
        if(!newValue) {
            newValue = 'YYYY-MM-DD'
        }
        const displayTimeFormat = useDisplayTimeFormat()
        displayTimeFormat.value = newValue
    }
    fontSizeBus.on(handleTimeSettingChange)

    onUnmounted(() => {
        fontSizeBus.off(handleTimeSettingChange)
        // document.removeEventListener('focus', handleDocumentFocus, true);
    })

    onMounted(() => {
        window.onfocus = handleDocumentFocus;
        checkClicpBoard();
    } )


}



