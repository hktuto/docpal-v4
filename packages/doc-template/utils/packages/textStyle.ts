import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import SuperScript from '@tiptap/extension-superscript'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import FontSize from '@tiptap/extension-font-size'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'

export const TextStyleNode = [
  Bold,
  Italic,
  Highlight.configure({ multicolor: true }),
  Underline,
  SuperScript,
  Subscript,
  Strike,
  FontSize,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle.configure({ mergeNestedSpanStyles: true }),
]
