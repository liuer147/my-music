<template>
  <div class="tabs">
    <router-link
      class="tab_item"
      v-for="item of tabs"
      :key="item.path"
      :to="item.path"
    >
    <span class="item_text">
      {{item.name}}
    </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      tabs: [{
        name: '推荐',
        path: '/recommend'
      }, {
        name: '歌手',
        path: '/singer'
      }, {
        name: '排行',
        path: '/top-list'
      }, {
        name: '搜索',
        path: '/search'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  height: 44px;
  line-height: 44px;
  display: flex;
  font-size: $font-size-medium;
  .tab_item {
    flex: 1;
    text-align: center;
    color: $color-text-l;
    .item_text { /* 对于高亮下划线效果，可以用span包裹然后添加padding-bottom使其达成效果 */
      padding-bottom: 5px;
    }
    &.router-link-active {
      color: $color-theme;
      .item_text {
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
