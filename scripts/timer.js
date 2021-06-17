let startTime
let endTime 
let timeElapsed

export const getTime = (running) => {
    running ? endTime = Date.now() : startTime = Date.now()
}

export const calculateDiffernce = () => {
    timeElapsed = formatTime(endTime - startTime)
    console.log('timeElapsed', timeElapsed)
    displayTime()
}

const displayTime = () => {
    const time = document.querySelector('.time')
    time.innerHTML = timeElapsed
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

/* 
const formatTime = (timeInMilli) => {
    console.log('timeInMilli =', timeInMilli)
    let minutes = Math.floor((timeInMilli / 60000) % 60)
    let seconds = Math.floor((timeInMilli / 1000) % 60)
    let centiseconds = Math.floor((timeInMilli % 1000) / 10) 
    
    return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(centiseconds)}`
}

const padNumber = (num) => {
    return num.toString().padStart(2, 0);
} 
*/

export const resetTimer = () => {
    startTime = undefined
    endTime = undefined
    timeElapsed = undefined
    numOfLaps = 0
    newSession = true
    time.innerHTML = '00:00.00'
}