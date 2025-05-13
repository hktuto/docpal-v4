// style
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import link from '@tiptap/extension-link'
import SuperScript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'

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
// utils
import Gapcursor from '@tiptap/extension-gapcursor'
import FontFamily from '@tiptap/extension-font-family'
import CharacterCount from '@tiptap/extension-character-count'
import TextStyle from '@tiptap/extension-text-style'
import History from '@tiptap/extension-history'
import {VariableText} from './variable/text'

import PaginationExtension, { PageNode, HeaderFooterNode, BodyNode } from "tiptap-extension-pagination";


export type TipTapOptions = {
  textCount?: number,
  mode: 'PAGE' | 'ENDLESS',
  pageSetting ?: pageSettingOptions
}

export type pageSettingOptions = {
  defaultMarginConfig: {
    bottom: number,
    left: number,
    top: number,
    right: number,
  },
  defaultPageBorders:{
    bottom: number,
    left: number,
    top: number,
    right: number,
  },
  defaultPaperColour: string,
  defaultPaperOrientation: "portrait" | "landscape",
  defaultPaperSize : string,
  pageAmendmentOptions: {
     enableHeader: boolean,
      enableFooter: boolean
  },
  useDeviceThemeForPaperColour: false,
}

const defaultPageSetting: pageSettingOptions = {
      defaultMarginConfig:{
        bottom: 5,
        top: 5,
        left: 5,
        right: 5,
      },
      defaultPageBorders: {
        bottom: 1,
        top: 1,
        left: 1,
        right: 1
      },
      defaultPaperColour: "#fff",
      defaultPaperOrientation: "portrait",
      defaultPaperSize: "A4",
      pageAmendmentOptions: {
        enableHeader: false,
        enableFooter: false
      }
    }

export function normalizeTipTapOptions(options : TipTapOptions) {
  //defautl mode is page
  if(!options.mode) {
    options.mode = 'PAGE'
  }
  if(options.mode === 'PAGE') {
    // normalize page setting here
    if(!options.pageSetting)  {
      options.pageSetting = defaultPageSetting
    }else{
      options.pageSetting = Object.assign(defaultPageSetting, options.pageSetting)
    }
  }
  return options
}

export const setupExtensions = (options: TipTapOptions) => {
  const extensions = [
      Heading,
      Document,
      // text
      Text,
      Paragraph,
      Image,
      //list
      BulletList,
      OrderedList,
      ListItem,
      ListKeymap,
      // style
      Bold,
      Italic,
      Highlight,
      Underline,
      SuperScript,
      link,
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
      CharacterCount.configure({
        limit: options?.textCount || null,
      }),
      TextStyle,
      FontFamily,
      Gapcursor,
      History,
      
      
  ]
  if(options?.mode === 'PAGE') {
    extensions.unshift(
      PaginationExtension.configure({
        defaultPaperSize: options.pageSetting?.defaultPaperSize || 'A4',
        defaultPaperOrientation: options.pageSetting?.defaultPaperOrientation || 'portrait',
        defaultMarginConfigs: options.pageSetting?.defaultPageBorders || {
            top: 5, right: 5, bottom: 5, left: 5 
          },
          
        defaultPageBorders: { top: 1, right: 1, bottom: 1, left: 1 },
        pageAmendmentOptions:{
          enableHeader: false,
          enableFooter: false,
        }
      }),
      HeaderFooterNode,
      PageNode,
      BodyNode
    )
  }
  return extensions
}
