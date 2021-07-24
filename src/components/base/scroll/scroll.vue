<template>
  <div class="scroll" ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useScroll } from './use-scroll.js'
export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default () {
        return true
      }
    },
    probeType: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  emits: ['scroll'],
  setup (props, { emit }) {
    const rootRef = ref(null)
    useScroll(rootRef, props, emit)
    return { rootRef }
  }
}
</script>

<style lang="scss" scoped>
</style>
