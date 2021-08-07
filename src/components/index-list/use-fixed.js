import { computed/* , nextTick */, onMounted, ref, watch } from 'vue'

export function useFixed (props) {
  const TITLE_HEIGHT = 30
  const groupRef = ref(null)
  const listHeight = ref([])
  const scrollY = ref(0)
  const currIndex = ref(0)
  const dis = ref(0)
  // const fixedStyle = ref('')
  onMounted(() => {
    calculate()
  })
  // calculate()
  // watch(() => props.singers, async () => {
  //   console.log('a')
  //   await nextTick()
  //   calculate()
  // })
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currGroup = props.singers[currIndex.value]
    // console.log('FG', listHeight)
    // console.log('GG', currIndex.value, scrollY.value, props.singers[currIndex.value].title)
    // return currGroup ? currGroup.title : ''
    return currGroup.title || ''
  })
  const fixedStyle = computed(() => {
    const diff = dis.value < TITLE_HEIGHT ? dis.value - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  })
  /**
   * ~监听一个响应式值，其参数里的值是其本身的值，而不是proxy
   *  */
  watch(scrollY, newY => {
    for (let i = 0; i < listHeight.value.length - 1; i++) {
      const startPos = listHeight.value[i]
      const endPos = listHeight.value[i + 1]
      // console.log(newY, startPos, endPos)
      if (newY >= startPos && newY <= endPos) {
        currIndex.value = i
        dis.value = endPos - newY
      }
    }
    // if (dis.value < TITLE_HEIGHT) {
    //   fixedStyle.value = `transform: translate3d(0, -${TITLE_HEIGHT - dis.value}px, 0)`
    // } else {
    //   fixedStyle.value = ''
    // }
    // console.log(currIndex.value)
  })
  function calculate () {
    const list = groupRef.value.children
    let height = 0

    listHeight.value.length = 0
    listHeight.value.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].offsetHeight
      listHeight.value.push(height)
    }
  }

  function onScroll (pos) { // 需要防抖节流
    scrollY.value = -pos.y
  }

  return { fixedTitle, groupRef, onScroll, fixedStyle, currIndex }
}
