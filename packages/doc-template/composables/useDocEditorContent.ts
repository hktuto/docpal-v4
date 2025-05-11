
type UseDocEditorContentParams = {
  focusLogic?: (ev:any, selecteIndex?: number) => void;
  enterKeyHandler?: (ev:any) => void;
  deleteKeyHander?: (ev:any) => void;
  otherKeyHandler?: (ev:any) => void;
}

export const useDocEditorContent = ({
  focusLogic,
  enterKeyHandler,
  deleteKeyHander,
  otherKeyHandler
}:UseDocEditorContentParams) => {

  const { exposed, emit, props } = getCurrentInstance();

  const { doc } = inject('docEditor') as any;
  const inputEl = ref()
  const lastCursorRange = ref()
  
  function focus(ev:any, selectIndex?:number) {
    if(ev && ev.preventDefault){ 
      ev.preventDefault()
      ev.stopPropagation()
    }
    // return if inputEl is already focused
    if(inputEl.value.isEqualNode(document.activeElement)){
      return
    }
    if(inputEl.value ){
      
      if(focusLogic){ 
        focusLogic(ev, selectIndex)
      } else {
        inputEl.value.focus()
      }
    }
  }

  function handleContentChange() {
    // console.log('handleContentChange', inputEl.value.innerHTML)
  }

  function handleKeyDown(ev:any) {
    if(ev.key === 'Enter') {
      if(enterKeyHandler) return enterKeyHandler(ev)
    }
    // if ev is backspace or delete
    if(ev.key === 'Backspace' || ev.key === 'Delete') {
      if(deleteKeyHander) return deleteKeyHander(ev)
    }
    if(otherKeyHandler) return otherKeyHandler(ev)
  }

  const observer = ref();
  function setupListener() {
    observer.value = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        handleContentChange();
      });
    });
    observer.value.observe(inputEl.value, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });
    inputEl.value.addEventListener('keydown', handleKeyDown);
    inputEl.value.addEventListener('click', focus);
  }


  exposed.focus = focus;

  onMounted(() => {
    setupListener()
  })

  onUnmounted(() => {
    observer.value.disconnect();
  })


  return {
    doc,
    props,
    inputEl,
    focus,
  }

}
