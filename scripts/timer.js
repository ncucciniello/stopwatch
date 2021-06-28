import { formatTime } from './formatTime.js'

let animationId = 0

export const getTimeStamp = (isRunning, globalTimeState) => {
    const timerState = {
        ...globalTimeState
    }
    isRunning ? timerState.stopTime = Date.now() : timerState.startTime = Date.now()
    return timerState
}

export const runTimer = (timerState) => {
    const time = document.querySelector('.time')
    const timeElapsed = (Date.now() - timerState.startTime) + timerState.currentDuration

    time.innerHTML = formatTime(timeElapsed)
    animationId = requestAnimationFrame(() => runTimer(timerState))
}

export const stopTimer = (globalTimerState) => {
    const timerState = {
        ...globalTimerState
    }

    cancelAnimationFrame(animationId)
    timerState.currentDuration = (timerState.stopTime - timerState.startTime) + timerState.currentDuration

    return timerState
}

export const resetTimer = () => {
    const time = document.querySelector('.time')
    time.innerHTML = '00:00.00'

    const newTimerState = {
        startTime: 0, 
        stopTime : 0,
        currentDuration: 0,
        pauseDuration: 0
    }

    return newTimerState
}