<template>
  <div class="iconContainer" style="--icon-size: var(--app-space-l);">
    <SvgIcon :src="iconSrc"/>
  </div>
</template>

<script lang="ts" setup>
type IconType = 'folder' | 'file'
type IconStatus = 'normal' | 'selected' | 'general'
import * as mime from 'mime-types'
const props = withDefaults(defineProps<{
  type?: IconType;
  status?: IconStatus;
  mimeType?: string;
  fileName?:string;
  documentBasicType?: string;
}>(), {
  type: 'folder',
  status: 'general'
})

const iconSrc = computed(() => {
  const {type, status, mimeType, fileName, documentBasicType} = props
  if(fileName) {
    const ext = fileName.split('.').pop()
    const mimeType = mime.types[ext] || false
    if(mimeType) {
      return mimeTypeToSrc(mimeType)
    }
  }
  if (mimeType) {
    return mimeTypeToSrc(mimeType)
  } else if (documentBasicType) {
    return documentBasicTypeToSrc(documentBasicType)
  } else {
    return `/icons/${type}-${status}.svg`
  }
})

function documentBasicTypeToSrc(documentBasicType: string) {
  switch (documentBasicType) {
    case 'Folder':
      return `/icons/folder-general.svg`
    case 'Audio':
      return `/icons/doc/audio.svg`
    case 'Video':
      return `/icons/doc/video.svg`
    case 'Picture':
      return `/icons/doc/image.svg`
    default:
      return `/icons/file-general.svg`
  }
}

function mimeTypeToSrc(mimeType: string) {
  // if mimetype is image, return image src
  if (mimeType?.startsWith('image')) {
    return `/icons/doc/image.svg`
  }

  // if mimetype is video, return video src
  if (mimeType?.startsWith('video')) {
    return `/icons/doc/video.svg`
  }
  // if mimetype is audio, return audio src
  if (mimeType?.startsWith('audio')) {
    return `/icons/doc/audio.svg`
  }

  // if mimetype is pdf, return pdf src
  if (mimeType?.startsWith('application/pdf')) {
    return `/icons/doc/pdf.svg`
  }
  // if mimetype is text, return text src
  if (mimeType?.startsWith('text')) {
    return `/icons/doc/text.svg`
  }
  // if mimetype is zip, return zip src
  if (mimeType?.startsWith('application/zip')) {
    return `/icons/doc/zip.svg`
  }
  // if mimetype is .xls or xlsx return  excel src
  if (mimeType?.startsWith('application/vnd.ms-excel') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    return `/icons/doc/excel.svg`
  }

  // if mimetype is word, return word src
  if (mimeType?.startsWith('application/msword') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
    return `/icons/doc/word.svg`
  }
  // if mimetype is ppt, return ppt src
  if (mimeType?.startsWith('application/vnd.ms-powerpoint') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
    return `/icons/doc/ppt.svg`
  }

  // if mimetype is unknown, return unknown src
  return `/icons/doc/file.svg`

}

</script>
