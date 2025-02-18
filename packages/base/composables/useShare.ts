
export type SimplifiedDocDetail = {
    id: string,
    name: string,
    path: string,
    isFolder: boolean,
    modifiedDate: string,
    createdDate: string,
    mimeType: string,
    documentType: string,
    contributors: string[],
    tags: string[],
    version: string,
    collections: string[]
}

export const useShareStore = () => {
    const state = reactive({
        shareList: <SimplifiedDocDetail[]>[]
    })
    async function getMineTypeShareList() {
        // const data = await DocumentThumbnailListGetApi(state.shareList.map((item:any) => item.id))
        return state.shareList.map((item:any) => {
            if(!item.mimeType && item.properties['file:content']['mime-type']) item.mimeType = item.properties['file:content']['mime-type']
            return {...item, readOnly: true}
        })
    }
    function updateShareList(list: SimplifiedDocDetail[]) {
        state.shareList = [...list]
        sessionStorage.setItem('shareList', JSON.stringify(state.shareList))
    }
    function addToShareList(list: SimplifiedDocDetail[], className: string) {
        if(!state.shareList) state.shareList = []
        list.forEach(item => {
            if(state.shareList.findIndex(i => {
                if(item.isFolder) return -1
                return i.id === item.id
            }) === -1) state.shareList.push(item)
        })
        sessionStorage.setItem('shareList', JSON.stringify(state.shareList))
    }

    function getUseWatermark(mimeType :string) {
        // check mintype is image, pdf or video
        return mimeType.includes('image') || mimeType.includes('pdf') || mimeType.includes('video')
    }
    onMounted(() => {
        const data = sessionStorage.getItem('shareList')
        if(!!data) state.shareList = JSON.parse(data)
    })
    return {
        getUseWatermark,
        getMineTypeShareList,
        updateShareList,
        addToShareList,
        state
    }
}
