// import { globalApi } from 'api'
import { ref, onMounted } from 'vue'

import * as XLSX from 'xlsx'
import vcardParser from 'vcard-parser'
export const useImportHelper = () => {
  function xlsxToJson(file: File, start: number = 0): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => {
        try {
          const data = e.target?.result // 获取的数据
          const workBook = XLSX.read(data, { type: 'binary', cellDates: true }) // data转xlsx数据对象
          let sheetNames = workBook.SheetNames || []
          let sheetDatas = workBook.Sheets || []
          // 获取columns title
          const columnTitles = XLSX.utils.sheet_to_json(sheetDatas[sheetNames[0]], { header: 1 })[0] as any[]
          resolve(columnTitles)
        } catch (error) {
          reject(error)
        }
      }
      fileReader.readAsArrayBuffer(file)
    })
  }
  async function vcfToJson(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => {
        const text = e.target?.result as string
        const vCard = vcardParser.parse(text)
        const columns: string[] = []
        Object.keys(vCard).forEach((key) => {
          columns.push(key)
        })
        resolve(columns)
      }
      fileReader.readAsText(file)
    })
  }
  async function getColumns(xlsxFile: File) {
    // get file extension
    let result: any[] = []
    const fileExtension = xlsxFile.name.split('.').pop()?.toLowerCase()
    switch (fileExtension) {
      case 'xlsx':
      case 'csv':
        result = await xlsxToJson(xlsxFile)
        break
      case 'vcard':
      case 'vcf':
        result = await vcfToJson(xlsxFile)
        break
    }
    return result
  }

  function downloadFailList(list: any[]) {
    const failList = list.map((item) => {
      return {name: item.name, value: item.value, status: 'F'}
    })
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(failList)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fail List')
    downloadBlob(workbook, 'failList.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  }
  return {
    getColumns,
    downloadFailList
  }
}
