import { ref, onUnmounted } from 'vue'

export default function useGesture () {
  const touch = {}
  const distance = ref(0)
  const gestureStyle = ref('')
  let timer
  function onTouchstart (e) {
    touch.startY = e.touches[0].pageY
    touch.startTime = Date.now()
  }

  function onTouchmove (e) {
    const tempY = e.touches[0].pageY
    distance.value = Math.max(0, tempY - touch.startY)
    gestureStyle.value = `transform: translate3d(0, ${distance.value}px, 0)`
  }

  function onTouchend (rootHeight, hidden) {
    gestureStyle.value = 'transition: all .3s;'
    const disTime = Date.now() - touch.startTime
    // console.log('player:', distance.value,rootHeight)
    disTime < 300 && distance.value > 100 && hidden()
    distance.value > (rootHeight / 2) && hidden()
    timer = setTimeout(() => {
      gestureStyle.value = ''
    }, 300)
  }

  onUnmounted(() => {
    window.clearTimeout(timer)
  })

  return {
    onTouchstart,
    onTouchmove,
    onTouchend,
    distance,
    gestureStyle
  }
}
