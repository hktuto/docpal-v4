
export const squareStep = 80
export const round = 80
export const taskLabel = {
    textAnchor: 'center',
    textAlign: 'center',
    textVerticalAnchor: 'top',
    refX: 0,
    y : squareStep / 2 + 5,
    fill: '#000',
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
export const squareNodeStyle = (color:string, img:string) => {
    const style:any = {
        width: squareStep,
        height: squareStep,
        attrs: {
            body: {
                stroke: color,
                strokeWidth: 1,
                fill: color,
                rx: 8,
                ry: 8,
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