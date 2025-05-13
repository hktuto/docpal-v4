import { convertTipTapToHTML } from "../utils/converter";

export default defineEventHandler( async(event) => {
  const body = await readBody(event)
  const {json} = typeof body === 'object' ? body : JSON.parse(body)
  // convert json.content variable
  const html = convertTipTapToHTML(json.content)
  return html
})
