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