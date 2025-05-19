
import Image from '@tiptap/extension-image'

export const ImageSetting = [
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'my-custom-class',
    },
  })
]
