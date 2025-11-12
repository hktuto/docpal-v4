import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export async function divToPDF(divId: string, name: string) {
  const contentDiv: HTMLElement | null = document.getElementById(divId)
  if (!contentDiv) {
    throw new Error('Content element not found')
  }
  const originalOverflow = contentDiv.style.overflow
  contentDiv.style.height = 'auto'
  contentDiv.style.overflow = 'visible'
  html2canvas(contentDiv).then((canvas) => {
    contentDiv.style.height = `${contentDiv.scrollHeight}px`
    contentDiv.style.overflow = originalOverflow
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    // // 获取PDF页面的宽高
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // // 获取canvas的宽高
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    // // 计算缩放比例
    const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const newWidth = imgWidth * scale
    const newHeight = imgHeight * scale
    // 添加进pdf时，左右间距1cm,上下间距0.5cm

    const leftOffset = 10
    const topOffset = 5
    // 添加图像到PDF
    // 不影响内容的情况下，左右间距1cm,上下间距0.5cm
    const contentWidth = newWidth - leftOffset * 2
    const contentHeight = newHeight - topOffset * 2
    const contentLeft = leftOffset
    const contentTop = topOffset
    pdf.addImage(imgData, 'PNG', contentLeft, contentTop, contentWidth, contentHeight)
    pdf.save(`${name}.pdf`)
  })
}
