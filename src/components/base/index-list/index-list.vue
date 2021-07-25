<template>
  <scroll class="index-list" :probe-type="3" @scroll="onScroll" ref="scrollRef">
    <ul ref="groupRef">
      <li v-for="group of singers" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li v-for="item of group.list" :key="item.id" class="item">
            <img class="avatar" v-lazy="item.pic" />
            <p class="name">{{ item.name }}</p>
          </li>
        </ul>
      </li>
    </ul>
    <div v-show="fixedTitle" class="fixed" :style="fixedStyle">
      <h2 class="title">{{ fixedTitle }}</h2>
    </div>
    <div
      class="shotcut"
      @touchstart.stop.prevent='onTouchstart'
      @touchmove.stop.prevent='onTouchmove'
      @touchend.stop.prevent
    >
      <ul>
        <li
          v-for="(item, index) of shotcutList"
          :key="item" class="shotcut_item"
          :data-index='index'
          :class="{current: currIndex === index}"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import scroll from '../scroll/scroll.vue'
import { useFixed } from './use-fixed.js'
import { useShotcut } from './use-shotcut.js'
export default {
  components: { scroll },
  name: 'index-list',
  props: {
    singers: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    const { fixedTitle, groupRef, onScroll, fixedStyle, currIndex } = useFixed(props)
    const { shotcutList, onTouchstart, onTouchmove, scrollRef } = useShotcut(props, groupRef)
    return {
      fixedTitle,
      groupRef,
      onScroll,
      fixedStyle,
      currIndex,
      // shotcut
      shotcutList,
      onTouchstart,
      onTouchmove,
      scrollRef
    }
  }
}
</script>

<style lang="scss" scoped>
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      background: $color-highlight-background;
      color: $color-text-l;
      font-size: $font-size-small;
    }
    .item {
      height: 70px;
      box-sizing: border-box;
      padding: 20px 0 0 30px;
      display: flex;
      .avatar {
        flex: 0 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        flex: 1;
        line-height: 50px;
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      background: $color-highlight-background;
      color: $color-text-l;
      font-size: $font-size-small;
    }
  }
  .shotcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    background: $color-background-d;
    font-family: Helvetica;
    /* 此处虽然没有设置高度，但通过padding,line-height,font-size间接设置了 */
    .shotcut_item {
      line-height: 1;
      padding: 3px;
      color: $color-text-l;
      font-size: $font-size-small;
      text-align: center;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
