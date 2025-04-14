import * as XLSX from 'xlsx';
import testReport from '../../.vitest-reporter-html/index.json';
async function createReport() {
  const dataArr = [];
  testReport.testResults.forEach(suite => {
    suite.assertionResults.forEach(test => {
      const titles = test.ancestorTitles.join(',').split(']');
      const title1 = titles[0].replace('[', '');
      dataArr.push([title1, titles[1], test.title, '', '', '', '', '']);
    });
  });
  dataArr.push(
    ['Total', '', testReport.numTotalTests],
    // ['Passed', testReport.numPassedTests],
    // ['Failed', testReport.numFailedTests],
  );
  jsonToXlsx(dataArr);
}
createReport();
function jsonToXlsx(exportArr) {
  const Header = [['Function', 'Test Case ID', 'Test Case Title', 'Pre-conditions', 'Test Step', 'Expected Result', 'Actual Result', 'Test Automation?']];
  const headerWs = XLSX.utils.aoa_to_sheet(Header);
  const ws = XLSX.utils.sheet_add_json(headerWs, exportArr, { skipHeader: true, origin: 'A2' });
  const wb = XLSX.utils.book_new();
  const wscolLens: any = [16, 16, 52, 10, 6, 10, 12, 12];
  const wscols = wscolLens.map(width => ({ wpx: width * 10 }));
  ws['!cols'] = wscols;
  XLSX.utils.book_append_sheet(wb, ws, 'Summary');
  XLSX.writeFile(wb, `unit-test.xlsx`);
}
