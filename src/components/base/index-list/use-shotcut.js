import { computed, ref } from 'vue'

export function useShotcut (props, groupRef) {
  const scrollRef = ref(null)
  const ANCHOR_HEIGHT = 18
  const shotcutList = computed(() => {
    return props.singers.map(group => {
      return group.title
    })
  })

  const touch = {}
  function onTouchstart (e) {
    const index = +e.target.dataset.index
    touch.y1 = e.touches[0].pageY
    touch.currIndex = index
    scrollTo(index)
  }
  function onTouchmove (e) {
    const y2 = e.touches[0].pageY
    const diff = (y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const currIndex = touch.currIndex + diff // 不能在原来的地方修改
    // console.log(currIndex)
    scrollTo(currIndex)
  }

  function scrollTo (index) {
    if (isNaN(index)) { // 处理touchstart时target没有dataset.index(不是想要的目标元素)
      return
    }
    index = Math.max(0, Math.min(index, groupRef.value.children.length - 1)) // 处理touchmove时，移动的pagey超过或少于touch区域而导致的currIndex不在范围内
    const touchEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll // 一定要是原来的scroll吗
    scroll.scrollToElement(touchEl, 0)
  }

  return {
    shotcutList,
    onTouchstart,
    onTouchmove,
    scrollRef
  }
}
