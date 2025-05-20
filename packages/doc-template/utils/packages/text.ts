import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'

export const TextNode = [
  Heading.configure({
        levels: [1, 2, 3, 4, 5]
  }),
  Text,
  Paragraph,
]
