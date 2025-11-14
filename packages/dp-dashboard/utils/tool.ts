import dayjs from 'dayjs'
export async function svgToBase64(src: string, color: string = '#8796A4') {
  const file = await fetch(src)
  let svgText = await file.text()
  svgText = svgText.replace('<svg ', `<svg style="color: ${color}" `)
  svgText = svgText.replaceAll('fill="currentColor"', '')
  svgText = svgText.replaceAll('fill="none"', '')
  svgText = svgText.replaceAll('<path ', `<path fill="currentColor" `)
  let url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgText)))}`
  return url
}

export async function parseSvg(src: string, cb: any) {
  return new Promise(async (resolve, reject) => {
    // 1、创建img
    var img = document.createElement('img')
    // 2、svg转base64
    img.setAttribute('src', await svgToBase64(src))
    // 3、转指定格式
    img.onload = function () {
      // 1、创建canvas
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      // 2、根据base64生成canvas
      context.drawImage(img, 0, 0)
      // 3、canvas转字符串
      resolve(canvas.toDataURL('image/png'))
    }
  })
}

export function fileSize(value: number, sizeList: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']) {
  if (value === 0) return `${value}${sizeList[0]}`
  if (!value) return '-'
  const a = 1024
  value = Number(value)
  if (value < a) return `${value.toFixed(2)}${sizeList[0]}`
  let getLoga = (a: any, n: any) => {
    // a的x次方=n x=n的对数（x以a为底数 N的对数）
    // 下面的函数返回以 a 为底 n 的对数（即 loga n）
    return Math.floor(Math.log(n) / Math.log(a))
  }

  let logaN = getLoga(a, value)
  let size = (value / Math.pow(a, logaN)).toFixed(2)
  return `${size}${sizeList[logaN]}`
}
export function getYearMonthDates(startDate: string, endDate: string, mode: string) {
  try {
    const format = mode === 'yearMonth' ? 'YYYYMM' : 'YYYYMMDD'
    const _mode = mode === 'yearMonth' ? 'year' : 'month'
    const _startDate = dayjs(startDate).format(format)
    const _endDate = dayjs(endDate).format(format)
    let result: any = []
    for (let i: any = _startDate; i <= _endDate; i++) {
      const date = i.toString()
      const length = date.length
      if (length === 6) {
        const month = Number(date.slice(-2))
        if (month > 12 || month === 0) continue
      }
      result.push(date)
    }
    return result
  } catch (error) {
    return []
  }
}
export const digitalConversion = (value: number, section: number = 100000): string => {
  let i = 0
  let sum = value - section
  while (sum > 0) {
    sum = sum - section
    i++
  }
  const data = ['千', '万', '十万', '百万', '千万', '亿']
  const color = data[i]
  return color
}
export const FinancialComputing = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(0) + 'B' // 亿
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(0) + 'M' // 百万
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(0) + 'K' // 千
  } else {
    return num.toString() // 小于千的数字
  }
}
