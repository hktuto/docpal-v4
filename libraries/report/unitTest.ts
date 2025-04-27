import * as XLSX from 'xlsx'
import testReport from '../../.vitest-reporter-html/index.json'
export function createTestReport() {
  const dataArr = []
  const totalMap = new Map()
  testReport.testResults.forEach((suite) => {
    suite.assertionResults.forEach((test) => {
      const titles = test.ancestorTitles.join(',').split(']')
      const title1 = titles[0].replace('[', '')
      if (totalMap.get(title1)) totalMap.set(title1, totalMap.get(title1) + 1)
      else totalMap.set(title1, 1)
      dataArr.push([title1, titles[1], test.title, '', '', '', 'Pass', ''])
    })
  })
  dataArr.push(
    ['Total', '', '', '', '', '', testReport.numTotalTests]
  )

  const totalArr = []
  totalMap.forEach((value, key) => {
    totalArr.push({
      Module: key,
      Total: value
    })
  })
  totalArr.push(
    {
      Module: '',
      Total: testReport.numTotalTests
    }
  )
  jsonToXlsx(dataArr, totalArr)
}
function jsonToXlsx(exportArr, totalArr) {
  const Header = [['Function', 'Test Case ID', 'Test Case Title', 'Pre-conditions', 'Test Step', 'Expected Result', 'Actual Result', 'Test Automation?']]
  const headerWs = XLSX.utils.aoa_to_sheet(Header)
  const ws = XLSX.utils.sheet_add_json(headerWs, exportArr, { skipHeader: true, origin: 'A2' })
  const wb = XLSX.utils.book_new()
  const wscolLens: any = [16, 16, 52, 10, 6, 10, 12, 12]
  const wscols = wscolLens.map((width) => ({ wpx: width * 10 }))
  ws['!cols'] = wscols
  XLSX.utils.book_append_sheet(wb, ws, 'Test Case')


  const totalWs = XLSX.utils.json_to_sheet(totalArr)
  const totalWscolLens: any = [16, 4]
  const totalWscols = totalWscolLens.map((width) => ({ wpx: width * 10 }))
  totalWs['!cols'] = totalWscols
  XLSX.utils.book_append_sheet(wb, totalWs, 'Summary')
  XLSX.writeFile(wb, `unit-test.xlsx`)
}
