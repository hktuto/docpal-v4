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
          name: 'import',
          components: 'lazyDocTemplateSettingImport'
        },
        {
          name: 'export',
          components: 'lazyDocTemplateSettingExport'
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
        {
          name: 'table',
          components: 'lazyDocTemplateContentToolbarTable'
        }
      ]
    },
    {
      name: 'Page',
      tools: [
        {
          name: 'Page Setting',
          components: 'lazyDocTemplateSettingPage'
        }
      ]
    },
    {
      name: 'Image',
      tools: []
    }
  ]
))

export const useDocExtendElement = () => useState<any[]>('docExtendEelement', () => ([
  {
    name: 'Bubble Menu',
    components: 'lazyDocTemplateSettingBubbleMenu'
  }
]))
