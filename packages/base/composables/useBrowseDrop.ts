import type { Ref } from 'vue'
import { emitBus, EventType } from 'eventbus'
import { useEventListener, useDebounceFn } from '@vueuse/core'
export const useBrowseDrop = (tableRef: any, containerRef: any, rootDocDetail: any) => {
  const dropRow = ref<any>({
    el: null,
    id: '',
    data: null,
    canDrop: false,
    parentData: null
  })
  const BrowseDragMove: any = inject('BrowseDragMove')
  const DEBOUNCE_TIME = 200
  const { createUploadRequest } = useUploadAIStore()
  async function handleDrop(event: any) {
    event.preventDefault()
    const _dropRow = JSON.parse(JSON.stringify(dropRow.value))
    BrowseDragMove.setDropRow(_dropRow)
    handleDragleave()
    if (event.dataTransfer && event.dataTransfer.items.length === 0) return
    try {
      if (!_dropRow.canDrop) {
        return
      }
      const files: any = await addDataTransfer(event.dataTransfer)
      uploadFiles(_dropRow.parentData ? _dropRow.parentData : _dropRow.data, files)
    } catch (error) {
      console.log('error', error)
    } finally {
    }
  }
  const handleDragover = useDebounceFn(
    (event: any) => {
      let rowEl = getParentRowId(event.target)
      let tableRow: any = {
        item: rootDocDetail.value,
        rowid: rootDocDetail.value.id,
        parentData: null
      }
      if (rowEl) {
        if (rowEl.children.length <= 2) {
          return
        }
        tableRow = tableRef.value?.getRowNode(rowEl)
      } else {
        if (isBreakCrumb(event.target)) {
          handleDragleave()
          return
        }
        rowEl = containerRef.value
      }
      if (dropRow.value.id !== tableRow?.rowid) {
        if (!tableRow?.item?.isFolder) {
          dropRow.value.parentData = tableRow?.parent
        } else {
          dropRow.value.parentData = null
        }
        if (dropRow.value.parentData) {
          dropRow.value.canDrop = dropRow.value.parentData.source === 'tempFile' ? false : RbacAllowTo('create', { ...dropRow.value.parentData })
        } else {
          dropRow.value.canDrop = tableRow?.item.source === 'tempFile' ? false : RbacAllowTo('create', { ...tableRow?.item })
        }
        if (dropRow.value.el) {
          dropRow.value.el.classList.remove('drop-row')
          dropRow.value.el.classList.remove('drop-row-disabled')
        }
        // change dropRow
        dropRow.value.el = rowEl
        dropRow.value.id = tableRow?.rowid
        dropRow.value.data = tableRow?.item
        if (dropRow.value.canDrop) {
          dropRow.value.el.classList.add('drop-row')
        } else {
          dropRow.value.el.classList.add('drop-row-disabled')
        }
      }
    },
    DEBOUNCE_TIME,
    {
      maxWait: DEBOUNCE_TIME
    }
  )
  function handleDragleave(event?: any) {
    setTimeout(() => {
      if (dropRow.value.el) {
        dropRow.value.el.classList.remove('drop-row')
        dropRow.value.el.classList.remove('drop-row-disabled')
      }
      dropRow.value.el = null
      dropRow.value.id = ''
      dropRow.value.data = null
    }, DEBOUNCE_TIME + 30)
  }
  function getParentRowId(element: any) {
    if (!element) return null
    if (element.tagName === 'TR') {
      return element
    }
    return getParentRowId(element.parentElement)
  }
  function isBreakCrumb(element: any): HTMLElement | null {
    if (!element) return null
    if (element.classList?.contains('breadItem')) {
      return element
    }
    return isBreakCrumb(element.parentElement)
  }
  async function uploadFiles(doc: any, files: any[]) {
    if (!files || files.length === 0) return
    const ev = new CustomEvent('openUploadDrawer', { detail: true })
    document.dispatchEvent(ev)
    await createUploadRequest(doc, files)

    setTimeout(() => {
      emitBus(EventType.FILE_NEED_REFRESH, {
        relatedIdOrPath: doc.id
      })
    }, 1000)
  }

  onMounted(() => {
    useEventListener(window, 'dragleave', (event: any) => {
      handleDragleave()
    })
  })
  return {
    dropEvent: {
      drop: handleDrop,
      dragover: handleDragover
    }
  }
}
