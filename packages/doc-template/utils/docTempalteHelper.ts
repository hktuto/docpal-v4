import { el } from "element-plus/es/locales.mjs";

export type DocOptions = {
  docOptions: DocumentOptions,

  
}

export type DocumentOptions = {
  pageSize?: { // Defaults to U.S. letter portrait orientation.
    width: number, // width of the page for all pages in this section in TWIP. Defaults to 12240 Maximum 31680.
    height: number, // height of the page for all pages in this section in TWIP. Defaults to 15808 Maximum 31680.
  },
  pageOrientation?: 'portrait' | 'landscape', // Defaults to U.S. letter portrait orientation.
  pageMargins?: { // Defaults to U.S. letter portrait orientation.
    top: number, // top margin in TWIP. Defaults to 100 Maximum 31680.
    bottom: number, // bottom margin in TWIP. Defaults to 100 Maximum 31680.
    left: number, // left margin in TWIP. Defaults to 100 Maximum 31680.
    right: number, // right margin in TWIP. Defaults to 100 Maximum 31680.
    header: number, // header margin in TWIP. Defaults to 100 Maximum 31680.
    footer: number, // footer margin in TWIP. Defaults to 100 Maximum 31680.
    gutter: number, // gutter margin in TWIP. Defaults to 100 Maximum 31680.
  },
  title ?: string, // title of the document,
  subject ?: string, // subject of the document,
  creator ?: string, // creator of the document,
  keywords ?: string[], // keywords of the document,
  description ?: string, // description of the document,
  lastModifiedBy ?: string, // last modifier of the document,
  revision ?: string, // revision of the document,
  createdAt ?: string, // created date of the document,
  modifiedAt ?: string, // modified date of the document,
  headerType  ?: 'default' | 'first' | 'even', // header type of the document,
  header?: boolean,
  footer?: boolean,
  pageNumber ?: boolean, // flag to enable page number in footer. Defaults to false. Page number works only if footer flag is set as true.
  footerType?: 'default' | 'first' | 'even',
  font?: string // font name to be used. Defaults to Times New Roman.
  fontSize?: number, 
  lang ?: string 
}

export type ToolSection = {
  name : string,
  tools: DocTool[]
}

export type DocTool = {
  name: string,
  components: any 
}
export type DocPage = {
  pageSetting: any,
  content: DocConentItem[]
}


type ElementSelctionResponse = {
  startPosition: number,
  selectedText: string
}
export const getElementSelection = (el:HTMLElement) : null | ElementSelctionResponse => {
  const selection = window.getSelection();
  if (!selection ||selection.rangeCount === 0) {
    return null;
  }
  const range = selection.getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(el);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  return {
    startPosition: preSelectionRange.toString().length,
    selectedText: selection.toString(),
  }
  
}

export const setElementSelection = (el:HTMLElement, startPosition:number = 0) => {
  el.focus();  
  const range = createRange(el, startPosition);
    console.log(range)
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

const createRange = (node:any, targetPosition:number) => {
  let range = document.createRange();
  range.selectNode(node);
  range.setStart(node, 0);

  let pos = 0;
  const stack = [node];
  while (stack.length > 0) {
      const current = stack.pop();

      if (current.nodeType === Node.TEXT_NODE) {
          const len = current.textContent.length;
          if (pos + len >= targetPosition) {
              range.setEnd(current, targetPosition - pos);
              return range;
          }
          pos += len;
      } else if (current.childNodes && current.childNodes.length > 0) {
          for (let i = current.childNodes.length - 1; i >= 0; i--) {
              stack.push(current.childNodes[i]);
          }
      }
  }

  // The target position is greater than the
  // length of the contenteditable element.
  range.setEnd(node, node.childNodes.length);
  return range;
};

