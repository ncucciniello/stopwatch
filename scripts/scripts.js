import { getTimeStamp, runTimer, stopTimer, resetTimer } from './timer.js'
import { formatTime } from './formatTime.js'

const lapResetButton = document.querySelector('.lapResetButton')
const startStopButton = document.querySelector('.startStopButton')

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
            lapResetButton.classList.remove('disabled')
            isNewSession = false
        }
        runTimer(timerState)
        changeButtonToStop()

        if (timerState.stopTime > 0) {
            timerState.pauseDuration = Date.now() - timerState.stopTime
        }
    }
    else {
        changeButtonToStart()
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
        lapstate = resetLapState()
    }
}

const getCurrentLapTime = () => {
    lapState.endTime = Date.now()
    lapState.currentLapDuration = (lapState.endTime - lapState.startTime) - timerState.pauseDuration
    lapState.startTime = lapState.endTime
    timerState.pauseDuration = 0
}

const addLap = () => {
    const lapList = document.querySelector('.lapList')
    const lapListItem = document.createElement('li')
    const formattedLapTime = formatTime(lapState.currentLapDuration)

    lapListItem.innerHTML = `Lap ${lapState.numOfLaps + 1} <span>${formattedLapTime}</span> `

    if (lapState.currentLapDuration < lapState.shortestLap) {
        let prevShortest = document.querySelectorAll('.shortestLap')
        if (prevShortest.length != 0) {
            prevShortest[0].classList.remove('shortestLap')
        }

        lapState.shortestLap = lapState.currentLapDuration
        lapListItem.className += ' shortestLap'
    }

    if (lapState.currentLapDuration > lapState.longestLap) {
        let prevLongest = document.querySelectorAll('.longestLap')
        if (prevLongest.length != 0) {
            prevLongest[0].classList.remove('longestLap')
        }

        lapState.longestLap = lapState.currentLapDuration
        lapListItem.className += ' longestLap'
    }

    if (lapState.numOfLaps < 6 ) {
        lapList.removeChild(lapList.lastElementChild);
        lapList.prepend(lapListItem)
    }
    else {
        lapList.prepend(lapListItem)
    }
}

const resetLapState = () => {
    const lapResetButton = document.querySelector('.lapResetButton')
    lapResetButton.innerHTML = 'Lap'
    lapResetButton.className += ' disabled'

    newLapState = {
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