import type { DocumentOptions, ToolSection } from "~/utils/docTempalteHelper";


export const useDocHeader = () => useState<ToolSection[]>('docHeader', () => (
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

export const useDocExtendElement = () => useState<any[]>('docExtendEelement', () => ([
  {
    name: "Bubble Menu",
    components: "lazyDocTemplateSettingBubbleMenu"
  }
]))
