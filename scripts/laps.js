import { formatTime } from "./formatTime.js"

export const getCurrentLapTime = (lapState, timerState) => {

    const newLapState = {
        ...lapState
    }
    
    const newTimerState = {
        ...timerState
    }

    newLapState.currentLapDuration = (Date.now() - newLapState.startTime) - timerState.pauseDuration,
    newLapState.startTime = Date.now()

    newTimerState.pauseDuration = 0

    return [newLapState, newTimerState]
}

export const addLap = (lapState) => {
    const lapList = document.querySelector('.lap-list')
    const lapListItem = document.createElement('li')
    const formattedLapTime = formatTime(lapState.currentLapDuration)

    lapListItem.innerHTML = `Lap ${lapState.numOfLaps + 1} <span>${formattedLapTime}</span> `

    if (lapState.currentLapDuration < lapState.shortestLap) {
        const prevShortest = document.querySelector('.shortest-lap')
        if (prevShortest != null) {
            prevShortest.classList.remove('shortest-lap')
        }

        lapState.shortestLap = lapState.currentLapDuration
        lapListItem.className += ' shortest-lap'
    }

    if (lapState.currentLapDuration > lapState.longestLap) {
        const prevLongest = document.querySelector('.longest-lap')
        if (prevLongest != null) {
            prevLongest.classList.remove('longest-lap')
        }

        lapState.longestLap = lapState.currentLapDuration
        lapListItem.className += ' longest-lap'
    }

    if (lapState.numOfLaps < 6 ) {
        lapList.removeChild(lapList.lastElementChild)
        lapList.prepend(lapListItem)
    }
    else {
        lapList.prepend(lapListItem)
    }
}

export const resetLapState = () => {
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

export const resetLapList = () => {
    const lapList = document.querySelector('.lap-list')
    const lapListItem = document.createElement('li')

    lapList.innerHTML = ""

    for (let i = 0; i < 6; i++) {
        lapList.appendChild(lapListItem.cloneNode(true))
    }
}