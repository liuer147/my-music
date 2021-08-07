import { ref } from 'vue'

export default function useGesture () {
  const touch = {}
  const distance = ref(0)
  const gestureStyle = ref('')
  function onTouchstart (e) {
    touch.startY = e.touches[0].pageY
  }

  function onTouchmove (e) {
    const tempY = e.touches[0].pageY
    distance.value = Math.max(0, tempY - touch.startY)
    gestureStyle.value = `transform: translate3d(0, ${distance.value}px, 0)`
  }

  function onTouchend (rootHeight, hidden) {
    gestureStyle.value = 'transition: all .3s;'
    distance.value > (rootHeight / 2) && hidden()
    setTimeout(() => {
      gestureStyle.value = ''
    }, 300)
  }

  return {
    onTouchstart,
    onTouchmove,
    onTouchend,
    distance,
    gestureStyle
  }
}
