

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { viewerId } = typeof body === 'object' ? body : JSON.parse(body)
  const html = await fetch('http://localhost:3000/viewers?viewerId=' + viewerId).then(res => res.text())
  // remove all script tag in html
  const finalScript = html.match(/<script.*?>.*?<\/script>/g)
  return finalScript
})
