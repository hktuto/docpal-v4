type SlotData = {
    name: string,
    order: number,
    component: any
}

type CopyDocumentParams = {
    type: 'copy' | 'cut',
    doc: any
}
export const useCopyDocumnetList = () => useState<CopyDocumentParams[]>("browseCopyDocumemt", () => ([]))
export const useBrowse = () => {
    const infoSlots = useState<SlotData[]>('infoSlots', () => shallowRef<SlotData[]>([]));

    return {
        infoSlots
    }
}