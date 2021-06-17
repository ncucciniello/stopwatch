let animationId = 0

export const getTimeStamp = (isWatchRunning, timeStamp) => {
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

export const resetTimer = (isNewSession, numOfLaps, timeStamp) => {
    const time = document.querySelector('.time')

    timeStamp = {
        startTime: 0, 
        endTime : 0,
        currentDuration: 0
    }
    
    isNewSession = true
    numOfLaps = 0
    time.innerHTML = '00:00.00'
}