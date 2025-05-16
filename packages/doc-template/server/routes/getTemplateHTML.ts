

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { viewerId } = typeof body === 'object' ? body : JSON.parse(body)
  await sendRedirect(event, '/viewers?viewerId=' + viewerId, 302)
})
