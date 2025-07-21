
import enJson from '../deployment/src/en-US.json'
import zhJson from '../deployment/src/zh-CN.json'
import zhHKJson from '../deployment/src/zh-HK.json'
import oldEnJson from '../deployment/oldSrc/en-US.json'
import oldZhJson from '../deployment/oldSrc/zh-CN.json'
import oldZhHKJson from '../deployment/oldSrc/zh-HK.json'
import * as XLSX from 'xlsx';
import dayjs from 'dayjs'
function compareJSON(oldObj, newObj) {
  const diffs = [];
  compareValues('', oldObj, newObj, diffs);
  return diffs;
}

function compareValues(path, oldVal, newVal, diffs) {
  // 处理两个值都为undefined的情况
  if (oldVal === undefined && newVal === undefined) return;

  // 处理其中一个值为undefined的情况
  if (oldVal === undefined && newVal !== undefined) {
    console.log('add', path, newVal)
    diffs.push({ type: 'add', path: path || '.', newValue: newVal });
    return;
  }
  
  if (oldVal !== undefined && newVal === undefined) {
    diffs.push({ type: 'delete', path: path || '.', oldValue: oldVal });
    return;
  }

  // 处理类型不同的情况
  if (typeof oldVal !== typeof newVal) {
    diffs.push({ type: 'change', path: path || '.', oldValue: oldVal, newValue: newVal });
    return;
  }

  // 处理对象类型（包括数组和普通对象）
  if (typeof oldVal === 'object' && oldVal !== null && newVal !== null) {
    // 处理数组
    if (Array.isArray(oldVal) || Array.isArray(newVal)) {
      if (!Array.isArray(oldVal) || !Array.isArray(newVal)) {
        diffs.push({ type: 'change', path: path || '.', oldValue: oldVal, newValue: newVal });
        return;
      }
      const maxLen = Math.max(oldVal.length, newVal.length);
      for (let i = 0; i < maxLen; i++) {
        const currentPath = path ? `${path}[${i}]` : `[${i}]`;
        if (i >= oldVal.length) {
          diffs.push({ type: 'add', path: currentPath, newValue: newVal[i] });
        } else if (i >= newVal.length) {
          diffs.push({ type: 'delete', path: currentPath, oldValue: oldVal[i] });
        } else {
          compareValues(currentPath, oldVal[i], newVal[i], diffs);
        }
      }
    } else {
      // 处理普通对象
      const oldKeys = Object.keys(oldVal);
      const newKeys = Object.keys(newVal);
      const allKeys = new Set([...oldKeys, ...newKeys]);

      allKeys.forEach(key => {
        const currentPath = path ? `${path}.${key}` : key;
        if (!newVal.hasOwnProperty(key)) {
          diffs.push({ type: 'delete', path: currentPath, oldValue: oldVal[key] });
        } else if (!oldVal.hasOwnProperty(key)) {
          // console.log('add', currentPath, newVal[key])
          if(typeof newVal[key] === 'object') {
            console.log('add', currentPath, newVal[key])
            objectAddComparison(newVal[key], currentPath, diffs)
          } else {
            diffs.push({ type: 'add', path: currentPath, newValue: newVal[key] });
          }
        } else {
          compareValues(currentPath, oldVal[key], newVal[key], diffs);
        }
      });
    }
  } else {
    // 处理基本类型值\

    if (oldVal !== newVal) {
      diffs.push({ type: 'change', path: path || '.', oldValue: oldVal, newValue: newVal });
    }
  }
}
function objectAddComparison(newVal, path, diffs) {
  const newKeys = Object.keys(newVal);
  newKeys.forEach(key => {
    const currentPath = path ? `${path}.${key}` : key;
    if(typeof newVal[key] === 'object') {
      objectAddComparison(newVal[key], currentPath, diffs)
    } else {
      diffs.push({ type: 'add', path: currentPath || '.', newValue: newVal[key] });
    }
  })
}
function generateDiffReport(diffs) {
  const arr = []
  if (diffs.length === 0) {
    arr.push({
      Type: 'No differences found',
      Key: '',
      'New Value': '',
      'Old Value': '',
    })
    return arr
  }
  diffs.map(diff => {
    switch (diff.type) {
      case 'change':
        arr.push({
          Type: 'UPDATE',
          Key: diff.path,
          'New Value': diff.newValue,
          'Old Value': diff.oldValue,
        })
        break
      case 'add':
        arr.push({
          Type: 'NEW',
          Key: diff.path,
          'New Value': diff.newValue,
          'Old Value': '',
        })
        break
      case 'delete':
        arr.push({
          Type: 'DELETE',
          Key: diff.path,
          'New Value': '',
          'Old Value': diff.oldValue,
        })
        break
      default:
        arr.push({
          Type: 'UNKOWN',
          Key: diff.path,
          'New Value': '',
          'Old Value': '',
        })
    }
  });
  return arr
}

export function createLanguageReport() {
  const enDiff = compareJSON(oldEnJson, enJson);
  const zhDiff = compareJSON(oldZhJson, zhJson);
  const zhHKDiff = compareJSON(oldZhHKJson, zhHKJson);
  const enWs = XLSX.utils.json_to_sheet(generateDiffReport(enDiff));
  const zhWs = XLSX.utils.json_to_sheet(generateDiffReport(zhDiff));
  const zhHKWs = XLSX.utils.json_to_sheet(generateDiffReport(zhHKDiff));
  const wb = XLSX.utils.book_new();
  const wscolLens = [6, 32, 32, 32];
  const wscols = wscolLens.map(width => ({ wpx: width * 10 }));
  enWs['!cols'] = wscols;
  zhWs['!cols'] = wscols;
  zhHKWs['!cols'] = wscols;
  XLSX.utils.book_append_sheet(wb, enWs, 'English');
  XLSX.utils.book_append_sheet(wb, zhWs, '中文简体');
  XLSX.utils.book_append_sheet(wb, zhHKWs, '中文繁体');
  const date  = new Date()
  const now = dayjs(date).format('MM.DD')
  const twoWeeksAgo = dayjs().subtract(2, 'week').format('MM.DD');
  const fileName = `${twoWeeksAgo}-${now} Language changes.xlsx`
  XLSX.writeFile(wb, `./report_languageChange/${fileName}`);
  console.log(`[Language changes Excel] 文件已创建: ${fileName}`)
}
