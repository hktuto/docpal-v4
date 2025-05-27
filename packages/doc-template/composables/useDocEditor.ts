import type { DocumentOptions, ToolSection } from '~/utils/docTempalteHelper'


export const useDocHeader = () => useState<ToolSection[]>('docHeader', () => (
  [
    {
      name: 'Home',
      tools: [
        {
          name: 'Undo Redo',
          components: 'lazyDocTemplateSettingUndo'
        },
        {
          name: 'Text Setting',
          components: 'lazyDocTemplateSettingText'
        },
        
        {
          name: 'font',
          components: 'lazyDocTemplateContentToolbarFont'
        },
        {
          name: 'paragraph',
          components: 'lazyDocTemplateContentToolbarParagraph'
        },
        {
          name: 'fontStyle',
          components: 'lazyDocTemplateContentToolbarFontStyle'
        },
        {
          name: 'auxiliary',
          components: 'lazyDocTemplateContentToolbarAuxiliary'
        },
        
      ]
    },
    {
      name: "Table",
      tools: [
        {
          name: 'table',
          components: 'lazyDocTemplateContentToolbarTable'
        }
      ]
    },
    {
      name: "Data",
      tools: [
        {
          name: 'Variable Manager',
          components: 'DocTemplateContentToolbarVariableToolbarButton'
        },
        {
          name: 'Insert Variable',
          components: 'DocTemplateContentToolbarVariableInertText'
        },
        {
          name: 'Insert Link',
          components: 'DocTemplateContentToolbarVariableInertLink'
        }
      ]
    },
    {
      name: 'Setting',
      tools: [
         {
          name: 'Page Setting',
          components: 'lazyDocTemplateSettingPage'
        },
        {
          name: 'import',
          components: 'lazyDocTemplateSettingImport'
        },
        {
          name: 'export',
          components: 'lazyDocTemplateSettingExport'
        },
      ]
    }
  ]
))

export const useDocExtendElement = () => useState<any[]>('docExtendEelement', () => ([
  {
    name: 'Bubble Menu',
    components: 'lazyDocTemplateSettingBubbleMenu'
  }
]))
