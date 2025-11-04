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
      fileData.testResults.forEach((suite) => {
        suite.assertionResults.forEach((test) => {
          const titles = test.ancestorTitles.join(',').split(']')
          const title1 = titles[0].replace('[', '')
          if (count[title1]) {
            count[title1].total++
            if (test.status === 'passed') count[title1].passed++
            else if (test.status === 'failed') count[title1].failed++
            else count[title1].skiped++
          } else {
            count[title1] = {
              total: 1,
              passed: 0,
              failed: 0,
              skiped: 0
            }
            if (test.status === 'passed') count[title1].passed++
            else if (test.status === 'failed') count[title1].failed++
            else count[title1].skiped++
          }
          dataArr.push([title1, titles[1], test.title, '', '', '', test.status, ''])
        })
        // console.log(title);
        // if (!!title) {
        //   if(!count[title]) {
        //     count[title] = {
        //       total: 0,
        //       passed: 0,
        //       failed: 0,
        //       skiped: 0
        //     }
        //   }
        //   count[title] = {
        //     total: fileData.numTotalTests + count[title].total,
        //     passed: fileData.numPassedTests + count[title].passed,
        //     failed: fileData.numFailedTests + count[title].failed,
        //     skiped: fileData.numPendingTests + fileData.numTodoTests + count[title].skiped
        //   }
        // }
      })
      
      totalNum += fileData.numTotalTests
    })
    
    const totalArr = generateTotalArr(count, totalNum)
    const fileName = jsonToXlsx(dataArr, totalArr)
    console.log(`[Unit test summary] Excel 文件已创建: ${fileName}`)
    console.log(`点击这里跳转文件：
      file://${path.join(process.cwd(), '/report_unitTest/'+fileName)}`)
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
      ['Pass Rate']: Number(Number(item.passed / item.total).toFixed(4)) * 100 + '%',
      Total: item.total
    })
  })
  totalArr.sort((a, b) => a.Module.localeCompare(b.Module))
  totalArr.push({
    Module: '',
    ['Pass Rate']: Number(Number(passedTotal / totalNum).toFixed(4)) * 100 + '%',
    Total: totalNum
  })
  return totalArr
}
