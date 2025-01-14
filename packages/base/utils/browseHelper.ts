import * as mime from 'mime-types'

export function canCollaboraEdit(mimeType:string) {
    // is mimeType is .doc or .docx file
      // check is doc or docx
      const excelType = ['application/vnd.ms-excel', 'application/msexcel', 'application/x-msexcel', 'application/x-ms-excel', 'application/x-excel', 'application/x-dos_ms_excel','application/xls','application/x-xls','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      if(excelType.includes(mimeType)) return true;
      const wordType = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-word.template.macroEnabled.12']
      if(wordType.includes(mimeType)) return true;
      const pptType = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
      if(pptType.includes(mimeType)) return true;
  
      if(mimeType.includes('application/vnd.collabora') || mimeType.includes('application/vnd.collabora-project'))  return true;
    return false;
  }


export const formatFileSize = (size:number) => {
    if(!size) return ''
    if(size < 1024) {
        return size.toFixed(1) + ' KB'
    }else if(size < 1024 * 1024) {
        return (size / 1024).toFixed(1) + ' MB'
    }else  {
        return (size / 1024 / 1024).toFixed(2) + ' GB'
    }
}

export const mimeTypeToIcon = (mimeType:string) => {
    // if mimetype is image, return image src
    if(mimeType?.startsWith('image')) {
        return `/icons/doc/image.svg`
    }

    // if mimetype is video, return video src
    if(mimeType?.startsWith('video')) {
        return `/icons/doc/video.svg`
    }
    // if mimetype is audio, return audio src
    if(mimeType?.startsWith('audio')) {
        return `/icons/doc/audio.svg`
    }

    // if mimetype is pdf, return pdf src
    if(mimeType?.startsWith('application/pdf')) {
        return `/icons/doc/pdf.svg`
    }
    // if mimetype is text, return text src
    if(mimeType?.startsWith('text')) {
        return `/icons/doc/text.svg`
    }
    // if mimetype is zip, return zip src
    if(mimeType?.startsWith('application/zip')) {
        return `/icons/doc/zip.svg`
    }
    // if mimetype is .xls or xlsx return  excel src
    if(mimeType?.startsWith('application/vnd.ms-excel') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        return `/icons/doc/excel.svg`
    }
    // if mimetype is word, return word src
    if(mimeType?.startsWith('application/msword') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        return `/icons/doc/word.svg`
    }
    // if mimetype is ppt, return ppt src
    if(mimeType?.startsWith('application/vnd.ms-powerpoint') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
        return `/icons/doc/ppt.svg`
    }
    
    // if mimetype is unknown, return unknown src
    return `/icons/doc/file.svg`

}

export function mimeTypeToExtension(mimeType:string) {
    // if mimetype is image, return image src
    return mime.extension(mimeType) || '-'
}

export function toBrowseItem(path:string) {
    return {
        id: 'client-browse',
        name: path,
        icon: 'dp-icon:browse-outline',
        hoverIcon: 'dp-icon:browse-fill',
        label: path,
        component: "LazyBrowsePage",
        props:{
            idOrPath:path
        }
      }
}