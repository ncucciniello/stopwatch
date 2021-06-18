import { getTimeStamp, runTimer, stopTimer, resetTimer } from './timer.js'

const lapResetButton = document.querySelector('.lapResetButton')
const startStopButton = document.querySelector('.startStopButton')

let isRunning = false
let isNewSession = true

let timeStamp = {
    startTime: 0, 
    endTime : 0,
    currentDuration: 0
}

let lapState = {
    startTime: 0,
    endTime: 0,
    currentDuration: 0,
    numOfLaps: 0
}

const handleStartStopButton = () => {
    timeStamp = getTimeStamp(isRunning, timeStamp)
    
    if(!isRunning) {
        if(isNewSession) {
            lapState.startTime = timeStamp.startTime
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
        resetTimer(isNewSession, lapState, timeStamp)
        resetLapLog()
    }
    else {
        lapState.numOfLaps++
        addLap()
    }
}

const getCurrentLapTime = () => {
    if (lapState.startTime === 0) {

    }
}

const resetLapLog = () => {
    const lapLog = document.querySelector('.log')
    const lapElement = document.createElement('div')
    lapElement.setAttribute('class', 'lapTime')

    while (lapLog.firstChild) {
        lapLog.removeChild(lapLog.firstChild);
    }

    for (let i = 0; i < 6; i++) {
        lapLog.appendChild(lapElement.cloneNode(true))
    }
}

const addLap = () => {
    const lapLog = document.querySelector('.log')
    const lapElement = document.createElement('div')

    lapElement.setAttribute('class', 'lapTime')
    lapElement.innerHTML = `Lap ${lapState.numOfLaps} <span>${lapState.currentDuration}</span> `

    if (lapState.numOfLaps < 7 ) {
        lapLog.removeChild(lapLog.lastElementChild);
        lapLog.prepend(lapElement)
    }
    else {
        lapLog.prepend(lapElement)
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