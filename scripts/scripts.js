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
    // ------------ Debugging -----------
        // console.log('in handleStartStopButton')
        //     console.log('\t timerState', timerState)
        //     console.log('\t pausetime', formatTime(timerState.pauseDuration))
    // ----------- END DEBUGGING --------
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
        resetLapState()
    }
}

const getCurrentLapTime = () => {
    lapState.endTime = Date.now()
    // ------------ Debugging -----------
        // console.log('in getCurrentLapTime')
        //     console.log('\t lap startTime =', lapState.startTime)
        //     console.log('\t lap endTime =', lapState.endTime)
        //     console.log('\t lap duration =', formatTime(lapState.endTime - lapState.startTime))
        //     console.log('\t pause duration =', formatTime(timerState.pauseDuration))
    // ----------- END DEBUGGING --------
    lapState.currentLapDuration = (lapState.endTime - lapState.startTime) - timerState.pauseDuration
    lapState.startTime = lapState.endTime
    timerState.pauseDuration = 0
}

const addLap = () => {
    const lapLog = document.querySelector('.log')
    const lapElement = document.createElement('div')
    const formattedLapTime = formatTime(lapState.currentLapDuration)

    lapElement.setAttribute('class', 'lapTime')
    lapElement.innerHTML = `Lap ${lapState.numOfLaps + 1} <span>${formattedLapTime}</span> `

    if (lapState.currentLapDuration < lapState.shortestLap) {
        let prevShortest = document.querySelectorAll('.shortestLap')
        if (prevShortest.length != 0) {
            prevShortest[0].classList.remove('shortestLap')
        }

        lapState.shortestLap = lapState.currentLapDuration
        lapElement.className += ' shortestLap'
    }

    if (lapState.currentLapDuration > lapState.longestLap) {
        let prevLongest = document.querySelectorAll('.longestLap')
        if (prevLongest.length != 0) {
            prevLongest[0].classList.remove('longestLap')
        }

        lapState.longestLap = lapState.currentLapDuration
        lapElement.className += ' longestLap'
    }

    if (lapState.numOfLaps < 6 ) {
        lapLog.removeChild(lapLog.lastElementChild);
        lapLog.prepend(lapElement)
    }
    else {
        lapLog.prepend(lapElement)
    }
}

const resetLapState = () => {
    const lapResetButton = document.querySelector('.lapResetButton')
    lapResetButton.innerHTML = 'Lap'
    lapResetButton.className += ' disabled'

    lapState.startTime = 0
    lapState.endTime = 0
    lapState.currentDuration = 0
    lapState.numOfLaps = 0
    lapState.longestLap = 0
    lapState.shortestLap = 9999999
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