let context,
    angle,
    current = 0

const COUNT = 50,
    LIMIT_COUNT = false,
    FILL_STYLE = 'white',
    LINE_WIDTH = 1,
    STROKE_STYLE = 'black'

const drawRectangles = (element, angleDegrees, initialWidth, initialHeight) => {
    var canvas = document.getElementById('myCanvas')
    context = element.getContext('2d')
    context.canvas.width = initialWidth
    context.canvas.height = initialHeight
    context.fillStyle = FILL_STYLE
    context.lineWidth = LINE_WIDTH
    context.strokeStyle = STROKE_STYLE

    angle = (angleDegrees * Math.PI / 180)

    drawNextRectangle(initialWidth, initialHeight, true)
}

const renderRectangle = (w, h) => {
    context.beginPath()
    context.rect(0, 0, w, h)
    context.fill()
    context.stroke()
}

const drawNextRectangle = (w, h, isInitial) => {
    if (LIMIT_COUNT) {
        current++
        if (current >= COUNT) {
            return
        }
    }

    if (isInitial) {
        renderRectangle(w, h)
        return drawNextRectangle(w, h)
    }

    // TODO: fix stop condition so it doesn't print final extra quircky rectangle
    if (w < 1 || h < 1) {
        return
    }

    let scaleX = (w - (Math.tan(angle) * h)) / (w * Math.cos(angle)),
        scaleY = (h - ((Math.tan(angle)) * (w - Math.tan(angle) * h))) / (h * Math.cos(angle)),
        w2 = (w * scaleX),
        h2 = (h * scaleY),

        // TODO: ?
        // NewXScale = (w2 - (Math.tan(angle) * h2)) / (w2 * Math.cos(angle)),
        // NewYScale = (h2 - ((Math.tan(angle)) * (w2 - Math.tan(angle) * h2))) / (h2 * Math.cos(angle)),

        posX = Math.tan(angle) * h,
        posY = 0,
        posX2 = Math.tan(angle) * h2,
        posY2 = 0

    context.translate(posX, posY)
    context.rotate(angle)

    renderRectangle(w * scaleX, h * scaleY)

    drawNextRectangle(w2, h2)
}
