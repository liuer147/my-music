import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)
export function useScroll (elemRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(elemRef.value, {
      observeDOM: true,
      ...options
    })
    if (options.probeType > 0) {
      scroll.value.on('scroll', pos => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })
  onDeactivated(() => {
    scroll.value.disable()
  })

  return scroll
}
