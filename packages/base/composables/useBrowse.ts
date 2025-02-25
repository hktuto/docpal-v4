type SlotData = {
    name: string,
    order: number,
    component: any
}
const useCpoyDocumnetList = () => useState("browseCopyDocumemt", () => ([]))
export const useBrowse = () => {
    const infoSlots = useState<SlotData[]>('infoSlots', () => shallowRef<SlotData[]>([]));

    return {
        infoSlots
    }
}