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
    let currentTime = 20
    let timerId

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
        if ((currentTime === 0) || (squares[currentIndex].classList.contains('c1'))
        || (squares[currentIndex].classList.contains('l5'))
        || (squares[currentIndex].classList.contains('l4'))
        ) {
            result.innerHTML = 'You LOSE...'
            squares[currentIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup', moveFrog)
        }
    }

    document.addEventListener('keyup', moveFrog)
})