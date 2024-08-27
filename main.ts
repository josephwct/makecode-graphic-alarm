// clock_mode : SETTING / COUNT_DOWN / PAUSE
enum CLOCK_MODE {SETTING ,COUNT_DOWN , PAUSE}
let clock_mode = CLOCK_MODE.SETTING
let bg: Image = null
let numSecond = 0
let cursor_position = 0
let cursor = sprites.create(assets.image`imageBlank`, SpriteKind.Player)

const imageDigitArray = [assets.image`imageZero`,
    assets.image`imageOne`,
    assets.image`imageTwo`,
    assets.image`imageThree`,
    assets.image`imageFour`,
    assets.image`imageFive`,
    assets.image`imageSix`,
    assets.image`imageSeven`,
    assets.image`imageEight`,
    assets.image`imageNine`,
]

initVariables()
function initVariables() {
    numSecond = 0
    cursor_position = 0
    clock_mode = CLOCK_MODE.SETTING
    cursor.setPosition(50 + (16* cursor_position) , 58)
    animation.runImageAnimation(
        cursor,
        assets.animation`blink`,
        500,
        true
        )
}
function drawClock() {
    bg = image.create(screen.width, screen.height)
    bg.print("Arrows = set clock", 0, 0, 5, image.font8)
    bg.print("A = Start / Pause", 0, 10, 5, image.font8)
    bg.drawImage(assets.image`imageM`, 40, 30)
    bg.drawImage(assets.image`imageM`, 56, 30)
    bg.drawImage(assets.image`imageColon`,72,30)
    bg.drawImage(assets.image`imageS`,88,30)
    bg.drawImage(assets.image`imageS`,104,30)
    
    printClockFace(bg)
    scene.setBackgroundImage(bg)
}
function printClockFace(bg : Image) {
    if (numSecond <0) {
        numSecond=0
    }
    const minutes = Math.floor(numSecond / 60)
    const remainingSeconds = numSecond % 60
    
    bg.drawImage(imageDigitArray[Math.floor(minutes / 10)], 40, 50)
    bg.drawImage(imageDigitArray[minutes % 10], 56, 50)
    bg.drawImage(assets.image`imageColon`,72,50)
    bg.drawImage(imageDigitArray[Math.floor(remainingSeconds / 10)], 88, 50)
    bg.drawImage(imageDigitArray[remainingSeconds % 10], 104, 50)
}
game.onUpdateInterval(1000, function () {
    if (clock_mode == CLOCK_MODE.SETTING) {
        
    } else if (clock_mode == CLOCK_MODE.COUNT_DOWN) {
        numSecond -= 1
        if (numSecond == -1) {
            game.setGameOverMessage(true, "Time up !")
            game.gameOver(true)
            initVariables()
        }
    } else if (clock_mode == CLOCK_MODE.PAUSE) {
        
    }
    drawClock()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == CLOCK_MODE.SETTING) {
        if (cursor_position > 0) {
            cursor_position += -1
            if (cursor_position == 2) {
                cursor_position = 1
            }
        } else {
            cursor_position = 0
        }
        cursor.setPosition(50 + (16* cursor_position) , 58)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == CLOCK_MODE.SETTING) {
        if (cursor_position < 4) {
            cursor_position += 1
            if (cursor_position == 2) {
                cursor_position = 3
            }
        } else {
            cursor_position = 4
        }
        cursor.setPosition(50 + (16* cursor_position) , 58)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == CLOCK_MODE.SETTING) {
        if (cursor_position == 2) {
            return
        } else if (cursor_position == 4 ) {
            numSecond += 1
        } else if (cursor_position == 3 ) {
            numSecond += 10
        } else if (cursor_position == 1 ) {
            numSecond += 60
        } else if (cursor_position == 0 ) {
            numSecond += 600
        } 
        // range check
        if (numSecond < 0 ) {
            numSecond = 0
        } else if (numSecond > 59 * 60 + 59){
            numSecond = 59 * 60 + 59
        }
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == CLOCK_MODE.SETTING) {
        if (cursor_position == 2) {
            return
        } else if (cursor_position == 4) {
            numSecond -= 1
        } else if (cursor_position == 3 ) {
            numSecond -= 10
        } else if (cursor_position == 1 ) {
            numSecond -= 60
        } else if (cursor_position == 0 ) {
            numSecond -= 600
        } 
        // range check
        if (numSecond < 0 ) {
            numSecond = 0
        } else if (numSecond > 59 * 60 + 59){
            numSecond = 59 * 60 + 59
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (clock_mode == CLOCK_MODE.SETTING) {
        clock_mode = CLOCK_MODE.COUNT_DOWN
        animation.stopAnimation(animation.AnimationTypes.All, cursor)
        cursor.setImage(assets.image`imageBlank`)
    } else if (clock_mode == CLOCK_MODE.COUNT_DOWN) {
        clock_mode = CLOCK_MODE.PAUSE
    } else if (clock_mode == CLOCK_MODE.PAUSE) {
        clock_mode = CLOCK_MODE.COUNT_DOWN
    }
})