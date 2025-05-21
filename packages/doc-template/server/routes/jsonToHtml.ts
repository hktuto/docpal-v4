import * as pac from "docpal-document-editor";

export default defineEventHandler( async(event) => {
  const body = await readBody(event)
  console.log(pac)
  
  const {json, options} = typeof body === 'object' ? body : JSON.parse(body)
  // convert json.content variable
  // const html = convertTipTapToHTML(json.content, options)
  return ""
})
