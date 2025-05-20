
import {Readable} from 'stream'
import { sendStream } from 'h3'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { html, pageSetting = 
    {
      orientation: 'portrait',
      pageSize:{
        width : 11905.511811, // A4 size in TWIP
        height : 16837.795276 // A4 size in TWIP
      },
      margins:{
        top: 1000,
        right: 1000,
        bottom: 1000,
        left: 1000,
        header: 0,
        footer: 0,
        gutter: 0,
      },
      table: { row: { cantSplit: false } },
      font: "Arial",
      header: true,
      footer: true,
      pageNumber: true,
    } } = typeof body === 'object' ? body : JSON.parse(body)
  // check if body is a html file
  // if(!html.includes('html')) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'body should be an html file',
  //   })
  // }
  // clean up script in html
  // console.log(fileBuffer)
  // TODO : create pdf and send stream
  return html
  // await sendStream(event, Readable.from(fileBuffer))

})
