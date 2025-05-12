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

import PaginationExtension, { PageNode, HeaderFooterNode, BodyNode } from "tiptap-extension-pagination";


export type TipTapOptions = {
  textCount?: number,
  mode: 'PAGE' | 'ENDLESS',
  pageSetting ?: {
    defaultPagerSize: 'A4',
    defaultPaperOrientation: "portrait" | "landscape",
    defaultMarginConfig: {
      top: number,
      right: number,
      bottom: number,
      left: number,
    },
    pageAmendmentOptions: {
      enableHeader: boolean,
      enableFooter: boolean
    }
  }
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
      // utils
      CharacterCount.configure({
        limit: options.textCount,
      }),
      TextStyle,
      FontFamily,
      Gapcursor,
      
  ]
  if(options.mode === 'PAGE') {
    extensions.unshift(
      PaginationExtension.configure({
        defaultPaperSize: "A4",
        defaultPaperOrientation: "portrait",
        defaultMarginConfig: { top: 5, right: 5, bottom: 5, left: 5 },
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
