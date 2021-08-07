import { computed } from '@vue/reactivity'
import { h, mergeProps, watch, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import Scroll from '../base/scroll/scroll.vue'

export default {
  name: 'wrap-scroll',
  props: Scroll.props,
  emits: Scroll.emits,
  render (ctx) {
    return h(Scroll, mergeProps({
      ref: 'scrollRef'
    }, ctx.$props, {
      onScroll: (e) => {
        ctx.$emit('scroll', e)
      }
    }), {
      default: () => ctx.$slots.default()
    })
  },
  setup () {
    const scrollRef = ref(null)

    const store = useStore()
    const playlist = computed(() => store.state.playlist)

    const scroll = computed(() => scrollRef.value.scroll)

    watch(playlist, async () => {
      if (scrollRef.value) {
        await nextTick()
        scroll.value.refresh()
      }
    })

    return {
      scrollRef,
      scroll
    }
  }
}
