/*
プロジェクトで使用する主な機能
* switch
* cases
* addEventListener
* removeEventListener
* setInterval
* clearInterval
* document.querySelector
* arrow functions
*/

document.addEventListener('DOMContentLoaded', () => {

    //定数
    const squares = document.querySelectorAll('.grid div')
    const logsLeft = document.querySelectorAll('.log-left')
    const logsRight = document.querySelectorAll('.log-right')
    const carsLeft = document.querySelectorAll('.car-left')
    const carsRight = document.querySelectorAll('.car-right')
    const timeLeft = document.querySelector('#time-left')
    const result = document.querySelector('#result')
    const startBtn = document.querySelector('#button')
    const width = 9

    //変数
    let currentIndex = 76
    let currentTime = 5
    let timerId

    // ゲームスタートのファンクション
    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
        } else {
            timerId = setInterval(movePieces, 1000) // 部品
            document.addEventListener('keyup', moveFrog) //カエル
        }
    })

    // 各部品を動かすファンクション
    function movePieces() {
        currentTime --
        timeLeft.textContent = currentTime
        lose() // Lose
        autoMoveCars() // 車
        automoveLogs() // 木の板
        moveWithLogLeft() // 木の板と左
        moveWIthLogRight() //  木の板と右に
    }

    

    // カエルを動かすファンクション
    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog')
        switch(e.keyCode) {
            case 37: // Left
                if(currentIndex % width !== 0) currentIndex -= 1
                break
            case 39: // Right
                if(currentIndex % width < width - 1) currentIndex += 1
                break
            case 38: // Up
                if(currentIndex - width >= 0) currentIndex -= width
                break
            case 40: // Down
                if(currentIndex + width < width * width) currentIndex += width
                break
        }
        squares[currentIndex].classList.add('frog')
        win()
        lose()
    }


    // winのファンクション
    function win() {
        if (squares[4].classList.contains('frog')) {
            result.innerHTML = 'You WIN!'
            squares[currentIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
    }

    // loseのファンクション
    function lose() {
        if ((currentTime === 0) 
        || (squares[currentIndex].classList.contains('c1'))
        || (squares[currentIndex].classList.contains('l5'))
        || (squares[currentIndex].classList.contains('l4'))
        ) {
            result.innerHTML = 'You LOSE...'
            squares[currentIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
    }


    // 車を動かすファンクション
    function autoMoveCars() {
        carsLeft.forEach(carLeft => moveCarLeft(carLeft))
        carsRight.forEach(carRight => moveCarRight(carRight))
    }

    // ループ処理で車を左に動かすファンクション
    function moveCarLeft(carLeft) {
        switch (true) {
            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1')
                carLeft.classList.add('c2')
                break
            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2')
                carLeft.classList.add('c3')
                break
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3')
                carLeft.classList.add('c1')
                break
        }
    }

    // ループ処理で車を右に動かすファンクション
    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1')
                carRight.classList.add('c3')
                break
            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2')
                carRight.classList.add('c1')
                break
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3')
                carRight.classList.add('c2')
                break
        }
    }

    
    
})