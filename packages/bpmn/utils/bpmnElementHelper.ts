
export const squareStep = 80
export const round = 80
export const taskLabel = {
    refX: 40,
    refY: 14,
    fill: 'rgba(0,0,0,0.85)',
    fontSize: 12,
    'text-anchor': 'start',
    textWrap: {
        width: -0, // 宽度减少 10px
        ellipsis: true,  // 文本超出显示范围时，自动添加省略号
        breakWord: true, // 是否截断单词
    }
}
export const iconOptionMaker = (iconPath:string) => {
    return {
        'xlink:href': iconPath,
        refWidth: 0.7,
        refHeight: 0.7,
        refX: 0.15,
        refY: 0.15
    }
}
function convertToNormalTitle(text:string) {
  // split text by capitalize
  return text.split(/(?=[A-Z])/).join(' ')
  // replace all first letter to uppercase
  return text.replace(/(^\w)/g, (match) => match.toUpperCase())
}
export const squareNodeStyle = (color:string, nodeType:string, img:string, width=200, height=64, bgColor='#fff', textColor='#000') => {
    const style:any = {
        width,
        height,
        attrs: {
            body: {
                stroke: '#ddd',
                strokeWidth: 1,
                fill: bgColor,
                rx: 8,
                ry: 8,
                refWidth: 1,
                refHeight: 1,
                filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))'
            },
            image: {
                'xlink:href':img,
                width: 24,
                height: 24,
                x: 12,
                y: 12,
              },
            title: {
                text: convertToNormalTitle(nodeType),
                refX: 46,
                refY: 12,
                fill: textColor,
                fontSize: 14,
                fontWeight: 'bold',
                'text-anchor': 'start',
              },
            text: {
                refX: 46,
                refY: 30,
                fontSize: 12,
                fill: textColor,
                textAnchor: 'start',
                textVerticalAnchor: 'top',
                textWrap: {
                    width: -52, // 宽度减少 10px
                    height: "70%", // 高度减少 10px
                    ellipsis: true,  // 文本超出显示范围时，自动添加省略号
                    breakWord: false, // 是否截断单词
                }
              },
        },
        markup: [
            {
                tagName: 'rect',
                selector: 'body'
            },
            {
                tagName: 'image',
                selector: 'image',
              },
            {
                tagName: 'text',
                selector: 'title',
              },
              {
                tagName: 'text',
                selector: 'text',
              },

        ]
    }
    // if(img) {
    //     style.attrs.image = iconOptionMaker(img)
    //     style.markup.push({
    //         tagName: 'image',
    //         selector: 'image',
    //         width: 16,
    //         height: 16,
    //         x: 12,
    //         y: 12,
    //     })
    // }
    return style
}


export const circleNodeStyle = (color:string, img:string) => {
    const style:any = {
        width: round,
        height: round,
        attrs: {
            body: {
                stroke: color,
                strokeWidth: 1,
                fill: color,
                rx: round /2,
                ry: round /2,
                refWidth: 1,
                refHeight: 1,
            },
            label:taskLabel
        },
        markup: [
            {
                tagName: 'rect',
                selector: 'body'
            },
            {
                tagName: 'text',
                selector: 'label'
            },

        ]
    }
    if(img) {
        style.attrs.image = iconOptionMaker(img)
        style.markup.push({
            tagName: 'image',
            selector: 'image'
        })
    }

    return style
}
