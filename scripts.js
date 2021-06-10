let min = document.querySelector('#min')
let sec = document.querySelector('#sec')
let milli = parseInt(document.querySelector('#milli').innerHTML,10)
let lapButton = document.querySelector('.leftButton')
let startButton = document.querySelector('.rightButton')

let running = false
let newSession = true
let numOfLaps = 0


let handleStartButton = () => {
    if(!running) {
        if(newSession) {
            lapButton.classList.remove('disabled')
            newSession = false
        }

        running = true
        changeToStop()
        lapButton.innerHTML = 'Lap'
    }
    else {
        running = false
        changeToStart()
        if(!running) {
            lapButton.innerHTML = 'Reset'
        }
    }
}

let handleLapButton = () => {

}

let changeToStop = () => {
    startButton.classList.remove('start')
    startButton.classList.add('stop')
    startButton.innerHTML = 'Stop'
}

let changeToStart = () => {
    startButton.classList.remove('stop')
    startButton.classList.add('start')
    startButton.innerHTML = 'Start'
}


startButton.addEventListener('click', handleStartButton)