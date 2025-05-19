// style





import {TextNode } from './packages/text'
import {TextStyleNode} from './packages/textStyle'
import {DocumentSetting} from './packages/document'
import {ImageSetting} from './packages/image'
import {LinkSetting} from './packages/link'
import {ListSetting} from './packages/list'
import {HorizontalRuleSetting} from './packages/horizontalRuleSetting'
import {TableSetting} from './packages/table'
import {TaskSetting} from './packages/task'
import { useUtils } from './packages/utils'
// list



// utils

import VariableText from './variable/text'
import { usePagination } from './packages/pagination';



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

export const defaultPageSetting: pageSettingOptions = {
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
  useDeviceThemeForPaperColour: false,
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
    ...TaskSetting,
    ...TableSetting,
    ...ImageSetting,
    ...LinkSetting,
    ...ListSetting,
    ...HorizontalRuleSetting,
    ...useUtils(options),
    //list
    
    // style
    
    
    // table
    
    // custom
    VariableText,
    
  ]
  if (options?.mode === 'PAGE') {
    extensions.unshift(
      ...usePagination(options.pageSetting)
    )
  }
  return extensions
}
