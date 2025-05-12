import type { DocumentOptions, ToolSection } from "~/utils/docTempalteHelper";


export const useDocHeader = () => useState<ToolSection[]>('header', () => (
  [
    {
      name: "Home",
      tools: [
        {
          name: "Text Setting",
          components: "lazyDocTemplateSettingText"
        },
        
        {
          name:"import",
          components: "lazyDocTemplateSettingImport"
        }
        
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

