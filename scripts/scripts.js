import { getTimeStamp, runTimer, stopTimer, resetTimer } from './timer.js'

const time = document.querySelector('.time')
const lapResetButton = document.querySelector('.leftButton')
const startStopButton = document.querySelector('.rightButton')

let isRunning = false
let isNewSession = true
let numOfLaps = 0


let timeStamp = {
    startTime: 0, 
    endTime : 0,
    currentDuration: 0
}


const handleStartStopButton = () => {
    timeStamp = getTimeStamp(isRunning, timeStamp)
    
    if(!isRunning) {
        if(isNewSession) {
            lapResetButton.classList.remove('disabled')
            isNewSession = false
        }
        requestAnimationFrame(() => runTimer(timeStamp))
        changeButtonToStop()
    }
    else {
        changeButtonToStart()
        stopTimer(timeStamp)
    }
}

const handleLapResetButton = () => {
    if(!isRunning) {
        console.log('reset pressed') 
        resetTimer(isNewSession, numOfLaps, timeStamp)
    }
    else {
        console.log('lap pressed')
        numOfLaps++
        console.log('numOfLaps =', numOfLaps)
    }
}

const changeButtonToStop = () => {
    isRunning = true
    startStopButton.classList.remove('start')
    startStopButton.classList.add('stop')
    startStopButton.innerHTML = 'Stop'
    lapResetButton.innerHTML = 'Lap'
}

const changeButtonToStart = () => {
    isRunning = false
    startStopButton.classList.remove('stop')
    startStopButton.classList.add('start')
    startStopButton.innerHTML = 'Start'
    lapResetButton.innerHTML = 'Reset'
}

startStopButton.addEventListener('click', handleStartStopButton)
lapResetButton.addEventListener('click', handleLapResetButton)