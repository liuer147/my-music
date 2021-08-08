import { useStore } from 'vuex'
import { ref, onMounted, onUnmounted, computed, watch, nextTick, inject } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default function useMiniSlider () {
  const wrapperRef = ref(null)

  const store = useStore()
  const fullScreen = computed(() => store.state.fullScreen)
  const playlist = computed(() => store.state.playlist)
  const sliderShow = computed(() => !fullScreen.value && playlist.value.length)
  const currentIndex = computed(() => store.state.currentIndex)

  const slider = ref(null)
  let sliderVal

  const songReady = inject('songReady')

  onMounted(() => {
    // console.log(wrapperRef.value)

    watch(sliderShow, async newSliderShow => {
      if (!newSliderShow) { // 注意，即使是响应式数据， watch里面回调函数的参数也是其本身的值
        return
      }
      await nextTick() // 为什么要nextTivk()? 因为BSroll中的refresh()api是设计dom的所有需要在等一个nextTick()
      if (!sliderVal) {
        sliderVal = slider.value = new BScroll(wrapperRef.value, {
          click: true,
          scrollX: true,
          scrollY: false,
          momentum: false,
          bounce: false,
          probeType: 2,
          slide: {
            autoplay: false,
            loop: true
          }
        })
        sliderVal.on('slidePageChanged', ({ pageX }) => {
          store.commit('setCurrentIndex', pageX)
        })
        // console.log('GG', slider.value)
      } else {
        // console.log('refresh')
        sliderVal.refresh()
      }
      sliderVal.goToPage(currentIndex.value, 0, 0)
    })
    watch(currentIndex, newIndex => {
      if (sliderVal && sliderShow.value) {
        // console.log('slider')
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })
    watch(playlist, async newPlaylist => {
      if (sliderVal && sliderShow.value && newPlaylist.length > 0) {
        await nextTick()
        sliderVal.refresh()
      }
    })
    watch(songReady, newSongReady => {
      if (!sliderVal || !sliderShow.value) {
        return
      }
      newSongReady ? sliderVal.enable() : sliderVal.disable()
    })
  })

  onUnmounted(() => {
    if (!sliderVal) return
    sliderVal.destroy()
  })

  return {
    wrapperRef
  }
}
