import * as mime from 'mime-types'

export const deepCopy  = (data:any) => {
    if (!data) return {}
    return JSON.parse(JSON.stringify(data));
}

export function downloadBlob (blob:any, name:string, type = "application/octet-stream") {
    const blobStream = new Blob([blob], { type })
    const fileName = calFileNameAndExt(blob.type, name);
    const url = window.URL.createObjectURL(blobStream)
    downloadUrl(url, fileName)
  }

  export function downloadUrl(url:string, name:string){
    const a = document.createElement('a')
    a.id = 'file_' + Date.now();
    a.href = url
    a.download = name;
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove();
  }
  

  export function calFileNameAndExt(mimeType: string, name: string):string {
    const ext = mime.extension(mimeType);
    // check name include extension
    if(ext && !name.includes(`.${ext}`)){
      return name + '.' + ext;
    } else {
      return name;
    }
    
  }

  