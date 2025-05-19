import { generateHTML } from '@tiptap/html'
// style
import {TextNode } from '../../utils/packages/text'
import {TextStyleNode} from '../../utils/packages/textStyle'
import {DocumentSetting} from '../../utils/packages/document'
import {ImageSetting} from '../../utils/packages/image'
import {LinkSetting} from '../../utils/packages/link'
import {ListSetting} from '../../utils/packages/list'
// table
import {TableSetting} from '../../utils/packages/table'
import {TaskSetting} from '../../utils/packages/task'
import {HorizontalRuleSetting} from '../../utils/packages/horizontalRuleSetting'
import { usePagination } from '../../utils/packages/pagination';

export const convertTipTapToHTML = (editorJson :any, options: TipTapOptions) => {
  try{
    const plugins = [
        ...TextNode,
        ...DocumentSetting,
        ...TextStyleNode,
        ...TaskSetting,
        ...TableSetting,
        ...ImageSetting,
        ...LinkSetting,
        ...ListSetting,
        ...HorizontalRuleSetting,
      ]
      if(options?.pageSetting){
        plugins.push(...usePagination(options?.pageSetting))
      }
      const html = generateHTML(editorJson, plugins)
      return html
    }catch(err) {
      return ""
    }
  // TODO : may need to normalize the html
  
}
