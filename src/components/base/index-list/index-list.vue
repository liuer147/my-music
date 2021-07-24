<template>
  <scroll class="index-list" :probe-type='3' @scroll="onScroll">
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
  </scroll>
</template>

<script>
import scroll from '../scroll/scroll.vue'
import { useFixed } from './use-fixed.js'
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
    const { fixedTitle, groupRef, onScroll, fixedStyle } = useFixed(props)
    return { fixedTitle, groupRef, onScroll, fixedStyle }
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
    top: 0;
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
}
</style>
