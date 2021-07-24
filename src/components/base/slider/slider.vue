<template>
  <div class="slider" ref="rootRef">
  <div class="slider_group">
    <div
      class="slider_page"
      v-for="item of sliders"
      :key="item.id"
    >
      <a :href="item.link">
        <img :src="item.pic">
      </a>
    </div>
  </div>
  <div class="dots_wrapper">
    <span
      class="dot"
      v-for="(item, index) of sliders"
      :key="item.id"
      :class="{'active': currentPageIndex === index}"
    />
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { useSlider } from './use-slider.js'
export default {
  name: 'slider',
  props: {
    sliders: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const rootRef = ref(null)
    const { currentPageIndex } = useSlider(rootRef)
    return { rootRef, currentPageIndex }
  }
}
/**
 * ~为什么设置宽高比，其内元素不用设置高度，甚至于说slider没有设置宽高
  */
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  // touch-action: pan-x;
  // font-size: 0px;
  .slider_group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider_page {
      display: inline-block;
      height: 100%;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots_wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
