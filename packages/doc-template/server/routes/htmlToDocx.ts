import HTMLtoDOCX from 'html-to-docx'
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
        header: 1440,
        footer: 2000,
        gutter: 0,
      },
      table: { row: { cantSplit: false } },
      font: "Arial",
      header: true,
      footer: true,
      pageNumber: true,
    } } = typeof body === 'object' ? body : JSON.parse(body)
  // check if body is a html file
  if(!html.includes('html')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'body should be an html file',
    })
  }
  // clean up script in html
  const htmlString = html.replace(/<script.*?>.*?<\/script>/g, '')
  const fileBuffer = await HTMLtoDOCX(htmlString, `
      <p>Header here <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
                alt="Red dot"
                style="height:40px;"
            /></p>
    `, pageSetting)
  // console.log(fileBuffer)
  await sendStream(event, Readable.from(fileBuffer))

})
