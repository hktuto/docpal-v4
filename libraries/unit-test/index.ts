import * as XLSX from 'xlsx';
import testReport from '../../.vitest-reporter-html/index.json';
async function createReport() {
  // 填充数据（根据JSON结构调整）
  // console.log(testReport.testResults);
  // detailsSheet.addRow(['Test Suite', 'Test Case', 'Status', 'Error']);
  const dataArr = [];
  testReport.testResults.forEach(suite => {
    suite.assertionResults.forEach(test => {
      dataArr.push([test.ancestorTitles.join(','), test.title, test.status, test.duration.toFixed(2), test.failureMessages.join(',')]);
    });
  });
  jsonToXlsx(dataArr);
  console.log(dataArr);
  // await workbook.xlsx.writeFile('vitest-report.xlsx');
}
createReport();
function jsonToXlsx(exportArr) {
  const Header = [['module', 'test', 'status', 'duration']];
  const headerWs = XLSX.utils.aoa_to_sheet(Header);
  const ws = XLSX.utils.sheet_add_json(headerWs, exportArr, { skipHeader: true, origin: 'A2' });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'sheetName');
  XLSX.writeFile(wb, `unit-test.xlsx`);
}
