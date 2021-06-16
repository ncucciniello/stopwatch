const time = document.querySelector('.time')
const lapResetButton = document.querySelector('.leftButton')
const startStopButton = document.querySelector('.rightButton')

let running = false
let newSession = true
let numOfLaps = 0

let startTime
let endTime 
let timeElapsed

const getTime = () => {
    running ? endTime = Date.now() : startTime = Date.now()
}

const calcDiffernce = () => {
    timeElapsed = formatTime(endTime - startTime)
    console.log('timeElapsed', timeElapsed)
    displayTime()
}

const displayTime = () => {
    time.innerHTML = timeElapsed
}

const formatTime = (timeInMilli) => {
    centiseconds = Math.floor(Math.floor(timeInMilli / 10) / 10)
    seconds = Math.floor((timeInMilli / 1000) % 60)
    minutes = Math.floor((timeInMilli / (1000 * 60)) % 60)
    
    return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(centiseconds)}`
}

const padNumber = (num) => {
    return num.toString().padStart(2, 0);
}







const handleStartStopButton = () => {
    getTime()
    
    if(!running) {
        if(newSession) {
            lapResetButton.classList.remove('disabled')
            newSession = false
        }
        changeToStop()
        lapResetButton.innerHTML = 'Lap'
    }
    else {
        changeToStart()
        calcDiffernce()
        if(!running) {
            lapResetButton.innerHTML = 'Reset'
        }
    }
}

const handleLapResetButton = () => {
    if(!running) {
        console.log('reset pressed') 
        resetTimer()
    }
    else {
        console.log('lap pressed')
        numOfLaps++
        console.log('numOfLaps =', numOfLaps)
    }
}

const resetTimer = () => {
    startTime = undefined
    endTime = undefined
    timeElapsed = undefined
    numOfLaps = 0
    newSession = true
    time.innerHTML = '00:00.00'
}

const changeToStop = () => {
    running = true
    startStopButton.classList.remove('start')
    startStopButton.classList.add('stop')
    startStopButton.innerHTML = 'Stop'
}

const changeToStart = () => {
    running = false
    startStopButton.classList.remove('stop')
    startStopButton.classList.add('start')
    startStopButton.innerHTML = 'Start'
}


startStopButton.addEventListener('click', handleStartStopButton)
lapResetButton.addEventListener('click', handleLapResetButton)