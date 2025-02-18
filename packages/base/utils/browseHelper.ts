import { clientApi } from 'api';
import { Download, Loading } from '@element-plus/icons-vue';
import { ElNotification, ElMessage} from 'element-plus'
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

export const getUniqueName = async(file:any) => {
    try {
        const fileName = file.fileName || file.name
        // TODO: check if deprecated
        const res = await clientApi.api.postNuxeoDocumentIsduplicatename({ path: file.goPath, titles: [ fileName ]}).then(res => res.data)
        const name = res[fileName]?.uniqueName || fileName
        return name
    } catch (error) {
        return file.fileName || file.name
    }
}


export const getDocDetail = async (idOrPath:string, userId:string) => {
    let doc: any = {
    }
    let permission: any = {}
    try{
        console.log(idOrPath, userId)
        const promise = [];
        promise.push(
            clientApi.api.postNuxeoDocument({idOrPath}),
            getPermission(idOrPath, userId)
        )
        let [ {data:doc}, permission ] = await Promise.all(promise)
        const displayMeta = await getDocumentAdditional(doc.type)
        doc.displayMeta = displayMeta
        return {
            doc,
            permission
        }

    }catch(err){
        throw err
    }
}

export const getDocumentAdditional = async(type:string):Promise<any[]> => {
    // cache type into window object
    try{
        if( window["docTypeCache"] && window["docTypeCache"][type]) {
            return window["docTypeCache"][type]
        }
        const { data } = await clientApi.api.postTypesMetadatas({name:type},{
            headers: { 'noThrowError' : "true" }
        })
        if(!data){
            throw new Error('no type found')
        }
        if(!window["docTypeCache"]) {
            window["docTypeCache"] = {[type]: data}
        } else {
            window["docTypeCache"][type] = data
        }
        return data
    } catch(err) {
        return []
    }
}

export const getPermission = async(idOrPath:string, userId:string):Promise<any> => {
    if(!idOrPath || !userId){
        return {}
    }
    const { data } = await clientApi.api.getNuxeoDocumentAclPermission({docId: idOrPath, userId})
    if(!data){
        throw new Error('no permission found')
    }
    return {
        ...data,
        hold: data.hold || {}
    }
}

async function DownloadDocApi(idOrPath:string, cb?:Function) {
    return clientApi.api.postNuxeoDocumentDownload({idOrPath},{
       format:'blob',
       timeout:0,
       onDownloadProgress: function (progressEvent) {
            if(cb) cb(progressEvent)
        }
    })
}

export async function downloadFileHandler(doc: any){
    
    const { t } = useI18n()
    // exportFolderStructureApi
    const id = new Date().valueOf() + doc.name
    const notification = ElNotification({
        title: '',
        icon: Download,
        dangerouslyUseHTMLString: true,
        message: `<span id="${id}">0%</span> ${doc.name}`,
        showClose: false,
        customClass: 'download-notification',
        duration: 0,
        position: 'bottom-right'
    });
    try{
        const blob = await DownloadDocApi(doc.id, (e: any) => {
        const el = document.getElementById(id)
        if(el) el.innerHTML = Math.round((e.loaded / e.total) * 100) + '%'
        })
        await downloadBlob(blob, doc.name)
        // await DownloadDocApi(props.doc.id)
    } catch(error:any) {
        ElMessage.error(t('download_noFile') as string)
    }
    setTimeout(() => {
        notification.close()
    }, 3000)
}

export function allowFeature(f: string) {
    
    
    // if (f === 'DOCUMENT_CONVERSION') return true
    // if(f === 'DOC_COMMENT') return false
    // if(f === 'DOC_ANNOTATION') return false
    // if(f === 'WORKFLOW_ADHOC') return false
    try {
    const features = useFeature()
      // @ts-ignore
      return feature[pageFeatures[f]] || feature[f]
    } catch (error) {
      return false
    }
  }