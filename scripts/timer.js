let animationId = 0

export const getTimeStamp = (isWatchRunning, globalTimeStamp) => {
    const timeStamp = {
        ...globalTimeStamp
    }
    isWatchRunning ? timeStamp.endTime = Date.now() : timeStamp.startTime = Date.now()
    return timeStamp
}

export const runTimer = (timeStamp) => {
    const time = document.querySelector('.time')    
    let timeElapsed = (Date.now() - timeStamp.startTime) + timeStamp.currentDuration

    time.innerHTML = formatTime(timeElapsed)
    animationId = requestAnimationFrame(() => runTimer(timeStamp))
}

export const stopTimer = (timeStamp) => {
    cancelAnimationFrame(animationId)
    timeStamp.currentDuration = (timeStamp.endTime - timeStamp.startTime) + timeStamp.currentDuration
}

const formatTime = (timeInMilli) => {
    const totalSeconds = timeInMilli / 1000
    const [minutes, seconds, centiseconds] = [
        totalSeconds / 60,
        totalSeconds % 60,
        (timeInMilli % 1000) / 10
    ].map((num) => Math.floor(num).toString(10).padStart(2, '0'))

    return `${minutes}:${seconds}.${centiseconds}`
}

export const resetTimer = (isNewSession, lapState, timeStamp) => {
    const time = document.querySelector('.time')

    time.innerHTML = '00:00.00'
    
    timeStamp.startTime = 0
    timeStamp.endTime = 0
    timeStamp.currentDuration = 0

    lapState.startTime = 0
    lapState.endTime = 0
    lapState.currentDuration = 0
    lapState.numOfLaps = 0
    
    isNewSession = true
}