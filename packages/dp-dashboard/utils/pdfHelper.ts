import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function divToPDF(divId: string, name: string) {
  const element = document.getElementById(divId) as HTMLElement;
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // 配置html2canvas选项以确保完整渲染
    const canvas = await html2canvas(element, {
      scale: 2, // 提高分辨率，使PDF更清晰
      useCORS: true, // 允许跨域图片
      allowTaint: true, // 允许跨域图片
      backgroundColor: '#ffffff', // 设置背景色
      logging: false, // 关闭日志
      imageTimeout: 0, // 图片加载超时时间
      // 确保SVG和图标能正确渲染
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(divId);
        if (clonedElement) {
          // 确保所有元素都可见
          clonedElement.style.display = 'block';
          clonedElement.style.overflow = 'visible';
          
          // 处理所有SVG元素
          const svgs = clonedElement.querySelectorAll('svg');
          svgs.forEach((svg) => {
            const computedStyle = window.getComputedStyle(svg);
            svg.setAttribute('width', computedStyle.width);
            svg.setAttribute('height', computedStyle.height);
          });
        }
      }
    });

    const imgData = canvas.toDataURL('image/png', 1.0); // 使用最高质量
    const pdf = new jsPDF('p', 'mm', 'a4');

    // A4纸的尺寸（毫米）
    const pdfWidth = 210; // A4宽度
    const pdfHeight = 297; // A4高度
    const pageHeight = 297;
    
    // 计算图片在PDF中的尺寸
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // 计算需要的页数
    let heightLeft = imgHeight;
    let position = 0;
    let page = 0;

    // 添加第一页
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // 如果内容超过一页，添加更多页面
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
      page++;
    }

    // 保存PDF文件
    pdf.save(`${name}.pdf`);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}

