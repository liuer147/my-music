import { ref, onMounted, onUnmounted } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)
export function useScroll (elemRef, options) {
  const scroll = ref(null)

  onMounted(() => {
    scroll.value = new BScroll(elemRef.value, {
      observeDOM: true,
      ...options
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
}
