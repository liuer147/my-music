export function shuffle (source) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt (max) {
  return Math.floor(Math.random() * (max + 1))
}

function swap (arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export function formatTime (time) {
  const min = (((time / 60) | 0) + '').padStart(2, '0')
  const sec = (((time % 60) | 0) + '').padStart(2, '0')
  return `${min}:${sec}`
}

export function deBounce (ms, callBack) {
  let lock = true
  return function (...args) {
    if (lock === false) {
      return
    }
    callBack.call(this, ...args)
    setTimeout(() => {
      lock = true
    }, ms)
  }
}
