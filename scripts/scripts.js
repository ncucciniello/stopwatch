import { getTimeStamp, runTimer, stopTimer, resetTimer } from './timer.js'
import { getCurrentLapTime, addLap, resetLapState, resetLapList } from './laps.js'

const lapResetButton = document.querySelector('.lap-reset-button')
const startStopButton = document.querySelector('.start-stop-button')

const START_TEXT = 'Start'
const STOP_TEXT = 'Stop'
const RESET_TEXT = 'Reset'
const LAP_TEXT = 'Lap'

let isRunning = false
let isNewSession = true

let timerState = {
    startTime: 0, 
    stopTime : 0,
    currentDuration: 0,
    pauseDuration: 0
}

let lapState = {
    startTime: 0,
    endTime: 0,
    currentLapDuration: 0,
    numOfLaps: 0,
    longestLap: 0,
    shortestLap: 9999999
}

const handleStartStopButton = () => {
    timerState = getTimeStamp(isRunning, timerState)
    
    if(!isRunning) {
        if(isNewSession) {
            lapState.startTime = timerState.startTime
            lapResetButton.disabled = false
            isNewSession = false
        }
        runTimer(timerState)
        changeToRunningState()

        if (timerState.stopTime > 0) {
            timerState.pauseDuration = Date.now() - timerState.stopTime
        }
    }
    else {
        changeToStoppedState()
        timerState = stopTimer(timerState)
    }
}

const handleLapResetButton = () => {
    if(isRunning) {
        [lapState, timerState] = getCurrentLapTime(lapState, timerState)
        addLap(lapState)
        lapState.numOfLaps++
    }
    else {
        timerState = resetTimer()
        isNewSession = true
        resetLapList()
        resetLapResetButton()
        lapState = resetLapState()
    }
}

const changeToRunningState = () => {
    isRunning = true
    startStopButton.classList.replace('start', 'stop')
    startStopButton.innerHTML = STOP_TEXT
    lapResetButton.innerHTML = LAP_TEXT
}

const changeToStoppedState = () => {
    isRunning = false
    startStopButton.classList.replace('stop', 'start')
    startStopButton.innerHTML = START_TEXT
    lapResetButton.innerHTML = RESET_TEXT
}

const resetLapResetButton = () => {
    const lapResetButton = document.querySelector('.lap-reset-button')
    lapResetButton.innerHTML = LAP_TEXT
    lapResetButton.disabled = true
}

startStopButton.addEventListener('click', handleStartStopButton)
lapResetButton.addEventListener('click', handleLapResetButton)