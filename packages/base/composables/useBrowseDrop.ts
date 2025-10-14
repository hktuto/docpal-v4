import type { Ref } from 'vue'
import { emitBus, EventType } from 'eventbus'
import { useEventListener, useDebounceFn } from '@vueuse/core'
export const useBrowseDrop = (tableRef: any, containerRef: Ref<HTMLElement>, rootDocDetail: any) => {
  const currentRow = ref<any>({
    el: null,
    id: '',
    data: null,
    canDrop: false,
    parentData: null
  })
  const DEBOUNCE_TIME = 200
  const { createUploadRequest } = useUploadAIStore()
  async function handleDrop(event: any) {
    event.preventDefault()
    const dropRow = JSON.parse(JSON.stringify(currentRow.value))
    handleDragleave()
    try {
      if (!currentRow.value.canDrop) {
        return
      }
      const files: any = await addDataTransfer(event.dataTransfer)
      uploadFiles(dropRow.parentData ? dropRow.parentData : dropRow.data, files)
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
      if (currentRow.value.id !== tableRow?.rowid) {
        if (tableRow?.parent) {
          currentRow.value.parentData = tableRow?.parent
        } else {
          currentRow.value.parentData = null
        }
        if (currentRow.value.parentData) {
          currentRow.value.canDrop = currentRow.value.parentData.source === 'tempFile' ? false : RbacAllowTo('create', { ...currentRow.value.parentData })
        } else {
          currentRow.value.canDrop = tableRow?.item.source === 'tempFile' ? false : RbacAllowTo('create', { ...tableRow?.item })
        }
        if (currentRow.value.el) {
          currentRow.value.el.classList.remove('drop-row')
          currentRow.value.el.classList.remove('drop-row-disabled')
        }
        // change currentRow
        currentRow.value.el = rowEl
        currentRow.value.id = tableRow?.rowid
        currentRow.value.data = tableRow?.item
        if (currentRow.value.canDrop) {
          currentRow.value.el.classList.add('drop-row')
        } else {
          currentRow.value.el.classList.add('drop-row-disabled')
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
      if (currentRow.value.el) {
        currentRow.value.el.classList.remove('drop-row')
        currentRow.value.el.classList.remove('drop-row-disabled')
      }
      currentRow.value.el = null
      currentRow.value.id = ''
      currentRow.value.data = null
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
