<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div class="operators">
        <div class="icon i-left">
          <i :class="modeIcon" @click="changeMode" />
        </div>
        <div class="icon i-left" :class="disableCls">
          <i class="icon-prev" @click="handlePrev" />
        </div>
        <div class="icon i-center" :class="disableCls">
          <i :class="playIcon" @click="togglePlay" />
        </div>
        <div class="icon i-right" :class="disableCls">
          <i class="icon-next" @click="handleNext" />
        </div>
        <div class="icon i-right">
          <i :class="favoriteCls" @click="handleFavorite" />
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="handlePause"
      @canplay="handleReady"
      @error="handleError"
      @ended="handleEnded"
    />
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import useMode from './use-mode.js'
import useFavorite from './use-favorite.js'
import { PLAY_MODE } from '../../assets/js/constant.js'
export default {
  name: 'player',
  setup () {
    const store = useStore()
    const audioRef = ref(null)
    const songReady = ref(false)
    const { modeIcon, changeMode } = useMode()
    const { favoriteCls, handleFavorite } = useFavorite()

    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    const currentIndex = computed(() => store.state.currentIndex)
    const playlist = computed(() => store.state.playlist)

    const playIcon = computed(() => playing.value ? 'icon-pause' : 'icon-play')
    const disableCls = computed(() => songReady.value ? '' : 'disable') // 对于其他函数改变的数据有关，可以使用computed
    watch(currentSong, newSong => {
      if (!newSong.id || !newSong.url) {
        return
      }
      songReady.value = false // 每次歌曲改变时，songReady设置为false
      const audioEl = audioRef.value || {} // 此处应该考虑audioRef为null的情况
      audioEl.src = newSong.url
      audioEl.play()
    })
    watch(playing, newPlaying => {
      const audioEl = audioRef.value
      if (!songReady.value) { // 当歌曲还未准备好播放时，直接返回
        return
      }
      newPlaying ? audioEl.play() : audioEl.pause()
    })

    function goBack () {
      store.commit('setFullScreen', false)
    }
    function togglePlay () {
      if (!songReady.value) {
        return
      }
      store.commit('setPlayingState', !playing.value)
    }
    function handlePause () { // 由于前面已经监听playing的状态，所以在考虑暂停的时候应该，以修改数据的情况来间接修改图标
      store.commit('setPlayingState', false)
    }
    function handlePrev () {
      const list = playlist.value
      if (!songReady.value || !list.length) {
        return
      }
      if (list.length === 1) {
        loop()
      } else {
        let index = currentIndex.value - 1
        if (index < 0) {
          index = list.length - 1
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }
    function handleNext () {
      const list = playlist.value
      if (!songReady.value || !list.length) {
        return
      }
      if (list.length === 1) {
        loop()
      } else {
        let index = currentIndex.value + 1
        if (index >= list.length) {
          index = 0
        }
        store.commit('setCurrentIndex', index)
        if (!playing.value) {
          store.commit('setPlayingState', true)
        }
      }
    }
    function loop () {
      const audioEl = audioRef.value
      audioEl.currentTime = 0
      audioEl.play()
    }
    function handleReady () {
      if (songReady.value) {
        return
      }
      songReady.value = true
    }
    function handleError () {
      songReady.value = true // 此处设置为true的目的是使用户可以在发生错误的时候改变歌曲，而不是僵在那里
    }
    function handleEnded () {
      const playMode = computed(() => store.state.playMode)
      playMode.value === PLAY_MODE.loop ? loop() : handleNext()
    }
    return {
      audioRef,
      fullScreen,
      currentSong,
      goBack,
      playIcon,
      togglePlay,
      handlePause,
      handlePrev,
      handleNext,
      handleReady,
      disableCls,
      handleError,
      modeIcon,
      changeMode,
      favoriteCls,
      handleFavorite,
      handleEnded
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
  }
  .operators {
    display: flex;
    position: fixed;
    bottom: 50px;
    width: 100%;
    align-items: center;
    .icon {
      flex: 1;
      color: $color-theme;
      &.disable {
        color: $color-theme-d;
      }
      i {
        font-size: 30px;
      }
    }
    .i-left {
      text-align: right;
    }
    .i-center {
      padding: 0 20px;
      text-align: center;
      i {
        font-size: 40px;
      }
    }
    .i-right {
      text-align: left;
    }
    .icon-favorite {
      color: $color-sub-theme;
    }
  }
}
</style>
