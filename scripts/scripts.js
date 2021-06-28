import { getTimeStamp, runTimer, stopTimer, resetTimer } from './timer.js'
import { formatTime } from './formatTime.js'

const lapResetButton = document.querySelector('.lapResetButton')
const startStopButton = document.querySelector('.startStopButton')

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
        changeButtonsToStopState()

        if (timerState.stopTime > 0) {
            timerState.pauseDuration = Date.now() - timerState.stopTime
        }
    }
    else {
        changeButtonsToStartState()
        timerState = stopTimer(timerState)
    }
}

const handleLapResetButton = () => {
    if(isRunning) {
        getCurrentLapTime()
        addLap()
        lapState.numOfLaps++
    }
    else {
        timerState = resetTimer()
        isNewSession = true
        resetLapLog()
        lapState = resetLapState()
    }
}

const getCurrentLapTime = () => {
    lapState.currentLapDuration = (Date.now() - lapState.startTime) - timerState.pauseDuration
    lapState.startTime = Date.now()
    timerState.pauseDuration = 0
}

const addLap = () => {
    const lapList = document.querySelector('.lapList')
    const lapListItem = document.createElement('li')
    const formattedLapTime = formatTime(lapState.currentLapDuration)

    lapListItem.innerHTML = `Lap ${lapState.numOfLaps + 1} <span>${formattedLapTime}</span> `

    if (lapState.currentLapDuration < lapState.shortestLap) {
        const prevShortest = document.querySelector('.shortestLap')
        if (prevShortest != null) {
            prevShortest.classList.remove('shortestLap')
        }

        lapState.shortestLap = lapState.currentLapDuration
        lapListItem.className += ' shortestLap'
    }

    if (lapState.currentLapDuration > lapState.longestLap) {
        const prevLongest = document.querySelector('.longestLap')
        if (prevLongest != null) {
            prevLongest.classList.remove('longestLap')
        }

        lapState.longestLap = lapState.currentLapDuration
        lapListItem.className += ' longestLap'
    }

    if (lapState.numOfLaps < 6 ) {
        lapList.removeChild(lapList.lastElementChild)
        lapList.prepend(lapListItem)
    }
    else {
        lapList.prepend(lapListItem)
    }
}

const resetLapState = () => {
    const lapResetButton = document.querySelector('.lapResetButton')
    lapResetButton.innerHTML = LAP_TEXT
    lapResetButton.disabled = true

    const newLapState = {
        startTime: 0,
        endTime: 0,
        currentLapDuration: 0,
        numOfLaps: 0,
        longestLap: 0,
        shortestLap: 9999999
    }

    return newLapState
}

const resetLapLog = () => {
    const lapList = document.querySelector('.lapList')
    const lapListItem = document.createElement('li')

    lapList.innerHTML = ""

    for (let i = 0; i < 6; i++) {
        lapList.appendChild(lapListItem.cloneNode(true))
    }
}

const changeButtonsToStopState = () => {
    isRunning = true
    startStopButton.classList.replace('start', 'stop')
    startStopButton.innerHTML = STOP_TEXT
    lapResetButton.innerHTML = LAP_TEXT
}


const changeButtonsToStartState = () => {
    isRunning = false
    startStopButton.classList.replace('stop', 'start')
    startStopButton.innerHTML = START_TEXT
    lapResetButton.innerHTML = RESET_TEXT
}

startStopButton.addEventListener('click', handleStartStopButton)
lapResetButton.addEventListener('click', handleLapResetButton)