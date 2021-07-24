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
    }
  },
  setup (props) {
    const rootRef = ref(null)
    useScroll(rootRef, props)
    return { rootRef }
  }
}
</script>

<style lang="scss" scoped>
</style>
