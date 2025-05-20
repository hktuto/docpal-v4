import Gapcursor from '@tiptap/extension-gapcursor'
import CharacterCount from '@tiptap/extension-character-count'
import History from '@tiptap/extension-history'

type UtilsOptions = {
  textCount?: number,
}

export const useUtils = (options:UtilsOptions) => [
  Gapcursor,
  CharacterCount.configure({
    limit: options?.textCount || null
  }),
  History,
]
