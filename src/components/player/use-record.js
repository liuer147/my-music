import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useRecord () {
  const store = useStore()
  // const playing = computed(() => store.state.playing)

  const recordCls = computed(() => store.state.playing ? '' : 'play-pause')

  return {
    recordCls
  }
}
