import * as XLSX from 'xlsx'
// import testReport from '../../.vitest-reporter-html/index.json'
import dayjs from 'dayjs'
// export function createTestReport() {
//   const dataArr = []
//   const count = {}
//   testReport.testResults.forEach((suite) => {
//     suite.assertionResults.forEach((test) => {
//       const titles = test.ancestorTitles.join(',').split(']')
//       const title1 = titles[0].replace('[', '')
//       if (count[title1]) {
//         count[title1].total++
//         if (test.status === 'passed') count[title1].passed++
//         else if (test.status === 'failed') count[title1].failed++
//         else count[title1].skiped++
//       } else {
//         count[title1] = {
//           total: 1,
//           passed: 0,
//           failed: 0,
//           skiped: 0
//         }
//         if (test.status === 'passed') count[title1].passed++
//         else if (test.status === 'failed') count[title1].failed++
//         else count[title1].skiped++
//       }
//       dataArr.push([title1, titles[1], test.title, '', '', '', test.status, ''])
//     })
//   })
//   dataArr.push(['Total', '', '', '', '', '', testReport.numTotalTests])

//   const totalArr = []
//   let passedTotal = 0
//   Object.keys(count).forEach((key) => {
//     const item = count[key]
//     passedTotal += item.passed
//     totalArr.push({
//       Module: key,
//       Passed: item.passed,
//       Failed: item.failed,
//       Skiped: item.skiped,
//       ['Pass Rate']: Number(Number(item.passed / item.total).toFixed(2)) * 100 + '%',
//       Total: item.total
//     })
//   })
//   totalArr.sort((a, b) => a.Module.localeCompare(b.Module))
//   totalArr.push({
//     Module: '',
//     ['Pass Rate']: Number(Number(passedTotal / testReport.numTotalTests).toFixed(2)) * 100 + '%',
//     Total: testReport.numTotalTests
//   })
//   jsonToXlsx(dataArr, totalArr)
// }
export function jsonToXlsx(exportArr, totalArr) {
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

  const date = new Date()
  const now = dayjs(date).format('MM.DD')
  const twoWeeksAgo = dayjs().subtract(2, 'week').format('MM.DD')
  const name = `${twoWeeksAgo}-${now} unit-test.xlsx`
  XLSX.writeFile(wb, `./report_unitTest/${name}`)
  return name
}
