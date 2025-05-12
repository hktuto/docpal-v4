import { generateHTML } from '@tiptap/html'
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
// text
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
// utils
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'



export const convertTipTapToHTML = (editorJson :any) => {
  const html = generateHTML(editorJson, [
    Bold,
    Italic,
    Highlight,
    Underline,
    SuperScript,
    link,
    BulletList,
    OrderedList,
    ListItem,
    // table
    Table,
    TableRow,
    TableHeader,
    TableCell,
    TextStyle,
    FontFamily,
    Text,
    Paragraph,
    Image,
    Heading,
    Document,
  ])
  // TODO : may need to normalize the html
  return html
}
