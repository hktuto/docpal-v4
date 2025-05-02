<script lang="ts" setup>


async function getHTML() {
  const html = await fetch('/getTemplateHTML',{
    method: 'POST',
    body: JSON.stringify({
      viewerId: 'test'
    })
  }).then(res => res.text())
  if(html.includes('html')) {
    return html
  }
  throw new Error('html not found')
}

async function downloadDocx() {
  const html = await getHTML()
  const blob = await fetch('/htmlToDocx',{
    method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      html
    })
  }).then( res => res.blob())
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'test.docx'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

async function downloadHTML() {
  const html = await getHTML()
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'test.html'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

</script>

<template>
  <div>
    <button @click="downloadHTML">download html file</button>
    <button @click="downloadDocx">download docx file</button>
  </div>
</template>
