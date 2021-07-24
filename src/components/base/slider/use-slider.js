import { ref, onMounted, onUnmounted } from 'vue'

import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export function useSlider (elemRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)
  onMounted(() => {
    slider.value = new BScroll(elemRef.value, {
      scrollX: true,
      scrollY: false,
      click: true,
      slide: true,
      probeType: 2,
      momentum: false,
      bounce: false
    })
    slider.value.on('slideWillChange', page => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value.destroy()
  })

  return { currentPageIndex }
}
