import { getTime, calculateDiffernce, resetTimer } from './timer.js'

const time = document.querySelector('.time')
const lapResetButton = document.querySelector('.leftButton')
const startStopButton = document.querySelector('.rightButton')

let running = false
let newSession = true
let numOfLaps = 0

const handleStartStopButton = () => {
    getTime(running)
    
    if(!running) {
        if(newSession) {
            lapResetButton.classList.remove('disabled')
            newSession = false
        }
        changeToStop()
        lapResetButton.innerHTML = 'Lap'
    }
    else {
        changeToStart()
        calculateDiffernce()
        if(!running) {
            lapResetButton.innerHTML = 'Reset'
        }
    }
}

const handleLapResetButton = () => {
    if(!running) {
        console.log('reset pressed') 
        resetTimer()
    }
    else {
        console.log('lap pressed')
        numOfLaps++
        console.log('numOfLaps =', numOfLaps)
    }
}

const changeToStop = () => {
    running = true
    startStopButton.classList.remove('start')
    startStopButton.classList.add('stop')
    startStopButton.innerHTML = 'Stop'
}

const changeToStart = () => {
    running = false
    startStopButton.classList.remove('stop')
    startStopButton.classList.add('start')
    startStopButton.innerHTML = 'Start'
}

startStopButton.addEventListener('click', handleStartStopButton)
lapResetButton.addEventListener('click', handleLapResetButton)