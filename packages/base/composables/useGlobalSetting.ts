
import {GlobalPasteEvent, useEventBus} from 'eventbus';

export const useDisplayTimeFormat = () => useState('display-time-format', () => 'YYYY-MM-DD')



export const useGlobalSetting = () => {


        // global bus event 
    const fontSizeBus = useEventBus<string>(EventType.USER_PREFERENCE_CHANGE__TIME)

    function handleDocumentFocus() {
        console.log('Document is focused');
        checkClicpBoard()
    }
    const lastClipboard = ref("")
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
            const clipboardData = JSON.parse(clipboardText)
            // check clipboardData.type is include in GlobalPasteEvent
            if(Object.values(GlobalPasteEvent).includes(clipboardData.type)){
                console.log(clipboardData.type)
                const bus = useEventBus(clipboardData.type)
                bus.emit(clipboardData.data)
            }
        } catch (error) {
            console.log("error", error)
        }
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
        // document.addEventListener('focus', handleDocumentFocus, true);
    } )


}



