// style
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import SuperScript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'
import FontSize from '@tiptap/extension-font-size'
import { Color } from '@tiptap/extension-color'

import Document from '@tiptap/extension-document'

import Image from '@tiptap/extension-image'
// table
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
// list
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import ListKeymap from '@tiptap/extension-list-keymap'
// text
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import { all, createLowlight } from 'lowlight'
import hljs from 'highlight.js'

// utils
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Gapcursor from '@tiptap/extension-gapcursor'
import FontFamily from '@tiptap/extension-font-family'
import CharacterCount from '@tiptap/extension-character-count'
import TextStyle from '@tiptap/extension-text-style'
import History from '@tiptap/extension-history'
import VariableText from './variable/text'
import Typography from '@tiptap/extension-typography'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import PaginationExtension, { PageNode, HeaderFooterNode, BodyNode } from 'tiptap-extension-pagination'

const lowlight = createLowlight(all)
export type TipTapOptions = {
  textCount?: number,
  mode: 'PAGE' | 'ENDLESS',
  pageSetting?: pageSettingOptions,
  theme: {
    fontSize: 12,
    fontColor: '#000000',
    fontBackgroundColor: '#ffffff',
    fontFamily: '',
    bodyFontSize: 20,
    h1FontSize: 20,
    highlightColor: '#ffff00'
  }
}

export type pageSettingOptions = {
  defaultMarginConfig: {
    bottom: number,
    left: number,
    top: number,
    right: number,
  },
  defaultPageBorders: {
    bottom: number,
    left: number,
    top: number,
    right: number,
  },
  defaultPaperColour: string,
  defaultPaperOrientation: 'portrait' | 'landscape',
  defaultPaperSize: string,
  pageAmendmentOptions: {
    enableHeader: boolean,
    enableFooter: boolean
  },
  useDeviceThemeForPaperColour: false
}

const defaultPageSetting: pageSettingOptions = {
  defaultMarginConfig: {
    bottom: 5,
    top: 5,
    left: 5,
    right: 5
  },
  defaultPageBorders: {
    bottom: 1,
    top: 1,
    left: 1,
    right: 1
  },
  defaultPaperColour: '#fff',
  defaultPaperOrientation: 'portrait',
  defaultPaperSize: 'A4',
  pageAmendmentOptions: {
    enableHeader: false,
    enableFooter: false
  }
}

export function normalizeTipTapOptions(options: TipTapOptions) {
  //defautl mode is page
  if (!options.mode) {
    options.mode = 'PAGE'
  }
  if (options.mode === 'PAGE') {
    // normalize page setting here
    if (!options.pageSetting) {
      options.pageSetting = defaultPageSetting
    } else {
      options.pageSetting = Object.assign(defaultPageSetting, options.pageSetting)
    }
  }
  return options
}

export const setupExtensions = (options: TipTapOptions) => {
  const extensions = [
    Heading.configure({
      levels: [1, 2, 3, 4, 5]
    }),
    Document,
    // text
    Text,
    Paragraph,
    Strike,
    Subscript,
    Image,
    Code,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    CodeBlock,
    CodeBlockLowlight.configure({ lowlight }),
    hljs,
    //list
    BulletList,
    OrderedList,
    ListItem,
    ListKeymap,
    // style
    Bold,
    Italic,
    Highlight.configure({ multicolor: true }),
    Underline,
    SuperScript,
    Link.configure({
      openOnClick: false
      // defaultProtocol: "https"
    }),
    FontSize,
    Color,
    // table
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    // custom
    VariableText,
    // utils
    HorizontalRule,
    CharacterCount.configure({
      limit: options?.textCount || null
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    TextStyle.configure({ mergeNestedSpanStyles: true }),
    FontFamily,
    Gapcursor,
    History,
    Typography
  ]
  if (options?.mode === 'PAGE') {
    extensions.unshift(
      PaginationExtension.configure({
        defaultPaperSize: options.pageSetting?.defaultPaperSize || 'A4',
        defaultPaperOrientation: options.pageSetting?.defaultPaperOrientation || 'portrait',
        defaultMarginConfig: options.pageSetting?.defaultPageBorders || {
          top: 5, right: 5, bottom: 5, left: 5
        },

        defaultPageBorders: { top: 1, right: 1, bottom: 1, left: 1 },
        pageAmendmentOptions: {
          enableHeader: false,
          enableFooter: false
        }
      }),
      HeaderFooterNode,
      PageNode,
      BodyNode
    )
    console.log(extensions[0])
  }
  return extensions
}
