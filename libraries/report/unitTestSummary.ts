import * as XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { jsonToXlsx } from './unitTest'
const jsonPath = '../../.vitest-reporter-html/json'
export function createReport() {
  fs.readdir(jsonPath, (err, files) => {
    if (err) {
      console.error(err)
      return
    }
    const jsonFiles = files.filter((file) => path.extname(file) === '.json')
    const dataArr = []
    const count = {}
    let totalNum = 0
    jsonFiles.forEach((file) => {
      const filePath = path.join(jsonPath, file)
      const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      let title = ''  
      fileData.testResults.forEach((suite) => {
        suite.assertionResults.forEach((test) => {
          const titles = test.ancestorTitles.join(',').split(']')
          title = titles[0].replace('[', '')
          dataArr.push([title, titles[1], test.title, '', '', '', test.status, ''])
        })
      })
      if (!!title) {
        count[title] = {
          total: fileData.numTotalTests,
          passed: fileData.numPassedTests,
          failed: fileData.numFailedTests,
          skiped: fileData.numPendingTests + fileData.numTodoTests
        }
      }
      totalNum += fileData.numTotalTests
    })
    
    const totalArr = generateTotalArr(count, totalNum)
    const fileName = jsonToXlsx(dataArr, totalArr)
    console.log(`[Unit test summary] Excel 文件已创建: ${fileName}`)
  })
}
function generateTotalArr(count, totalNum) {
  const totalArr = []
  let passedTotal = 0
  Object.keys(count).forEach((key) => {
    const item = count[key]
    passedTotal += item.passed
    totalArr.push({
      Module: key,
      Passed: item.passed,
      Failed: item.failed,
      Skiped: item.skiped,
      ['Pass Rate']: Number(Number(item.passed / item.total).toFixed(2)) * 100 + '%',
      Total: item.total
    })
  })
  totalArr.sort((a, b) => a.Module.localeCompare(b.Module))
  totalArr.push({
    Module: '',
    ['Pass Rate']: Number(Number(passedTotal / totalNum).toFixed(2)) * 100 + '%',
    Total: totalNum
  })
  return totalArr
}
