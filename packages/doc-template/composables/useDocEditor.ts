import type { DocConentItem, DocPage, DocumentOptions, ToolSection } from "~/utils/docTempalteHelper";


export const useDocHeader = () => useState<ToolSection[]>('header', () => (
  [
    {
      name: "Home",
      tools: [
        {
          name: "Text Setting",
          components: "lazyDocTemplateSettingText"
        },
        
      ]
    },
    {
      name: "Page",
      tools:[
        {
          name: "Page Setting",
          components: "lazyDocTemplateSettingPage"
        },
      ]
    },
    {
      name: "Image",
      tools:[]
    }
  ]
))

export const useDocEditor = () => {
  
  const options = ref<DocumentOptions>({
    pageSize: {
      width: 11905.511811, // A4 size in TWIP
      height: 16837.795276 // A4 size in TWIP
    },
    pageOrientation: 'portrait',
    pageMargins: {
      top: 1000,
      right: 1000,
      bottom: 1000,
      left: 1000,
      header: 1440,
      footer: 2000,
      gutter: 0,
    },
    title:'demo',
  })
  const header = useDocHeader
  const loading = ref(true);
  const selectedText = ref();
  const doc = ref<DocPage[]>([])
  const scale = ref(100);

  function setupEdtior(settings?: DocOptions) {
    loading.value = true;
    if(settings && settings.docOptions) {
      // TODO : normalize settings
      options.value = settings.docOptions
    }
    doc.value = [
      {
        pageSetting:{},
        content:[]
      }
    ]
    loading.value = false
  }

  return {
    setupEdtior,
    header,
    loading,
    scale,
    options,
    doc,
    selectedText
  }

}
