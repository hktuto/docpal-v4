


export const useDisplayTimeFormat = () => useState('display-time-format', () => 'YYYY-MM-DD')



export const useGlobalSetting = () => {


        // global bus event 
    const fontSizeBus = useEventBus<string>(EventType.USER_PREFERENCE_CHANGE__TIME)

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
    })

    return {

    }
}



