<template>
  <transition name="slide-bottom">
    <div class="mini-player" @click="setFullScreen">
      <div class="record_wrapper">
        <img
          class="img"
          :class="{ 'play-pause': !playing }"
          :src="currentSong.pic"
        />
      </div>
      <div class="content">
        <div class="slider_wrapper" ref="wrapperRef">
          <div class="slider_group" style>
            <template v-for="song in playlist" :key="song.id">
              <div class="slider_page">
                <h2 class="name">{{ song.name }}</h2>
                <p class="singer">{{ song.singer }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="control">
        <i :class="miniPlayIcon" @click.stop="togglePlay" />
      </div>
      <div class="control" @click.stop="showPlaylist">
        <i class="icon-playlist playlist" />
      </div>
      <Playlist ref="playlistRef" />
    </div>
  </transition>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import useMiniSlider from './use-mini-slider.js'
import Playlist from './playlist.vue'
export default {
  name: 'mini-player',
  components: { Playlist },
  props: {
    togglePlay: {
      type: Function
    },
    playlist: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const playlistRef = ref(null)
    const store = useStore()
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)

    const miniPlayIcon = computed(() => {
      return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
    })

    const { wrapperRef } = useMiniSlider()

    function setFullScreen () {
      store.commit('setFullScreen', true)
    }
    function showPlaylist () {
      playlistRef.value.show()
    }

    return {
      currentSong,
      setFullScreen,
      playing,
      miniPlayIcon,
      // slider
      wrapperRef,
      // playlist
      playlistRef,
      showPlaylist
    }
  }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
  z-index: 10;
  background-color: $color-highlight-background;
  display: flex;
  align-items: center;
  .record_wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    text-align: center;
    padding: 0 10px 0 20px;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      animation: rotate 20s linear infinite;
    }
    .play-pause {
      animation-play-state: paused;
    }
  }
  .content {
    flex: 1;
    height: 40px;
    position: relative;
    /**
    * ~对于flex:1等不确定其内容的元素，若是无法让其子元素宽度随其孙子元素宽边大小适应则采用这种方式：祖先元素为flex,其次用position:absolute撑开。
    */
    .slider_wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      touch-action: pan-x;
      .slider_group {
        // width: auto;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        // display: flex;
        display: inline-block;
        .slider_page {
          display: inline-block;
          line-height: 20px;
          width: 100%;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          .name {
            margin-bottom: 2px;
            @include no-wrap();
            font-size: $font-size-medium;
            color: $color-text;
          }
          .singer {
            @include no-wrap();
            font-size: $font-size-small;
            color: $color-text-d;
          }
        }
      }
    }
  }
  /*   .slider_wrapper {
    flex: 1;
    height: 40px;
    overflow: hidden;
    .slider_group {
      white-space: nowrap;
      height: 40px;
      overflow: hidden;
      .slider_page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          height: 20px;
          line-height: 15px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .singer {
          line-height: 18px;
          height: 20px;
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  } */

  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    font-size: 32px;
    color: $color-theme;
    .playlist {
      font-size: 28px;
      position: relative;
      top: -3px;
    }
  }
}
</style>
