<template>
  <teleport to="body">
    <transition name="fade">
      <div
        class="playlist"
        @click.self="hidden"
        v-show="visible && playlist.length"
      >
        <div class="content_wrapper">
          <div class="top_content">
            <div class="icon" @click.stop="changeMode">
              <i :class="modeIcon" />
            </div>
            <span class="iconText"
              >{{ modeText }}（{{ playlist.length }}首）</span
            >
            <div class="clear" @click.stop="showConfirm">
              <i class="icon-clear"></i>
            </div>
          </div>
          <Confirm title="是否清空歌曲列表?" ref="confirmRef" @confirm="clearSong"/>
          <!-- 为什么初始化滚动不了？因为页面渲染时机不对，初始化组件时页面还没有渲染 -->
          <!-- 怎么解决？让BSroll组件实例刷新。注意若是直接刷新还不行，(数据刷新，dom还未改变), 想要使dom也改变，得等待一个nextTick -->
          <Scroll class="list_content" ref="scrollRef">
            <transition-group name="list" tag="ul" ref="playlistRef">
              <li
                class="item"
                v-for="song of playlist"
                :key="song.id"
                @click.stop="selectItem(song)"
              >
                <div class="play_icon">
                  <i :class="{ 'icon-play': song.id === currentSong.id }" />
                </div>
                <span
                  class="name"
                  :class="{ playing: song.id === currentSong.id }"
                  >{{ song.name }}</span
                >
                <div class="control" @click.stop="handleFavorite(song)">
                  <i :class="favoriteCls(song)" />
                </div>
                <div class="control" @click.stop="removeSong(song)">
                  <i class="icon-delete" :class="{ disable: !canRemove }" />
                </div>
              </li>
            </transition-group>
          </Scroll>
          <div class="add_content">
            <div class="add">
              <i class="icon-add" />
              <span class="text">添加歌曲队列</span>
            </div>
          </div>
          <div class="close_content" @click="hidden">
            <span>关闭</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import useMode from './use-mode.js'
import Scroll from '../base/scroll/scroll.vue'
import Confirm from '../base/confirm/confirm.vue'
import { computed, inject, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'
import usefavorite from './use-favorite.js'
export default {
  name: 'playlist',
  components: { Scroll, Confirm },
  setup () {
    const visible = ref(false)
    const scrollRef = ref(null)
    const store = useStore()
    const playlistRef = ref(null)
    const transitionEnd = ref(true)
    const confirmRef = ref(null)

    const songReady = inject('songReady')

    const { modeIcon, modeText, changeMode } = useMode()
    const { favoriteCls, handleFavorite } = usefavorite()

    const playlist = computed(() => store.state.playlist)
    // const sequenceList = computed(() => store.state.sequenceList)
    const currentSong = computed(() => store.getters.currentSong)
    // const currentIndex = computed(() => store.state.currentIndex)
    const canRemove = computed(() => songReady.value && transitionEnd.value)

    watch(currentSong, async newCurrentSong => {
      if (!visible.value || !newCurrentSong.id) {
        return
      }
      await nextTick()
      scrollToCurrent()
    })

    async function show () {
      visible.value = true
      await nextTick()
      scrollRefresh()
      scrollToCurrent()
    }
    function hidden () {
      visible.value = false
    }
    function scrollRefresh () {
      scrollRef.value.scroll.refresh()
      // scrollRef.value.scroll.scrollToElement(playlistRef.value.children[currentIndex.value])
    }
    function scrollToCurrent () {
      const index = playlist.value.findIndex(item => item.id === currentSong.value.id)
      if (index < 0) {
        return
      }
      /**
 * ~注意若是获取transition-group渲染的dom元素，不是直接.value，而是.value.$el。$el指向的才是其渲染的元素
 *   */
      scrollRef.value.scroll.scrollToElement(playlistRef.value.$el.children[index])
    }

    function selectItem (songVal) {
      const currIndex = playlist.value.findIndex(item => item.id === songVal.id)
      console.log(visible.value && playlist.value.length)
      store.commit('setCurrentIndex', currIndex)
    }

    function removeSong (song) {
      if (!canRemove.value) {
        return
      }
      transitionEnd.value = false
      store.dispatch('removeSong', song)
      if (playlist.value.length <= 0) { // 当歌曲全被删除时得设置不显示
        hidden()
      }
      setTimeout(() => {
        transitionEnd.value = true
      }, 500)
    }
    function showConfirm () {
      confirmRef.value.show()
    }

    function clearSong () {
      store.dispatch('clearSong')
      hidden()
    }

    return {
      //
      show,
      hidden,
      visible,
      // mode
      modeIcon,
      modeText,
      changeMode,
      // clear
      confirmRef,
      showConfirm,
      clearSong,
      // list
      playlist,
      playlistRef,
      currentSong,
      selectItem,
      canRemove,
      // favorite-icon
      favoriteCls,
      handleFavorite,
      // remove-icon
      removeSong,
      // scroll
      scrollRef
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 499;
  background: rgba($color: #000000, $alpha: 0.2);
  .content_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 599;
    background: $color-highlight-background;
    .top_content {
      padding: 20px 30px 10px 20px;
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        color: $color-theme;
        margin-right: 10px;
      }
      .iconText {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .clear {
        @include extend-click();
        .icon-clear {
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
    }
    .list_content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        .play_icon {
          font-size: 12px;
          width: 20px;
          color: $color-theme;
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          &.playing {
            color: $color-theme;
          }
        }
        .control {
          padding: 10px;
          font-size: 12px;
          color: $color-theme;
          .icon-delete {
            &.disable {
              color: $color-text-d;
            }
          }
        }
      }
    }
    .add_content {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        border: 1px solid $color-text-ll;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        color: $color-text-ll;
        border-radius: 50px;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .close_content {
      text-align: center;
      line-height: 48px;
      color: $color-text-ll;
      font-size: $font-size-medium-x;
      background: $color-background-d;
    }
  }
}
</style>
