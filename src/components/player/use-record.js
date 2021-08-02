import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useRecord () {
  const store = useStore()
  const playing = computed(() => store.state.playing)

  const recordCls = computed(() => playing.value ? '' : 'play-pause')

  return {
    recordCls
  }
}
