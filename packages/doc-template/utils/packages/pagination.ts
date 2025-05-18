import PaginationExtension, { PageNode, HeaderFooterNode, BodyNode } from 'tiptap-extension-pagination'
import type{ pageSettingOptions } from '../tiptapHelper'

export const usePagination = (options?: pageSettingOptions) => [
  PaginationExtension.configure({
    defaultPaperSize: options?.defaultPaperSize || 'A4' as any,
    defaultPaperOrientation: options?.defaultPaperOrientation || 'portrait',
    defaultMarginConfig: options?.defaultPageBorders || {
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
]
