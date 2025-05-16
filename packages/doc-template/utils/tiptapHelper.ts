// style

import Link from '@tiptap/extension-link'

import { Color } from '@tiptap/extension-color'


import Image from '@tiptap/extension-image'
import {TextNode } from './packages/text'
import {TextStyleNode} from './packages/textStyle'
import {DocumentSetting} from './packages/document'
// table
import {TableSetting} from './packages/table'
import {Task} from './packages/task'
// list
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import ListKeymap from '@tiptap/extension-list-keymap'


// utils
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Gapcursor from '@tiptap/extension-gapcursor'
import FontFamily from '@tiptap/extension-font-family'
import CharacterCount from '@tiptap/extension-character-count'
import History from '@tiptap/extension-history'
import VariableText from './variable/text'
import Typography from '@tiptap/extension-typography'

import PaginationExtension, { PageNode, HeaderFooterNode, BodyNode } from 'tiptap-extension-pagination'

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
    ...TextNode,
    ...DocumentSetting,
    ...TextStyleNode,
    ...Task,
    // text
    ...TableSetting,
    Image,
    
    //list
    BulletList,
    OrderedList,
    ListItem,
    ListKeymap,
    // style
    
    Link.configure({
      openOnClick: false
      // defaultProtocol: "https"
    }),
    Color,
    // table
    
    // custom
    VariableText,
    // utils
    HorizontalRule,
    CharacterCount.configure({
      limit: options?.textCount || null
    }),
    
    
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
  }
  return extensions
}
