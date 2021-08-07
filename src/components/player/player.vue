<template>
  <div class="player">
    <transition name="slide-bottom">
      <div class="normal-player" ref="playerRef" v-show="fullScreen" style :style="gestureStyle">
        <div class="background">
          <img :src="currentSong.pic" />
        </div>
        <div class="top">
          <div class="back" @click.stop.prevent="goBack">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{ currentSong.name }}</h1>
          <h2 class="subtitle">{{ currentSong.singer }}</h2>
        </div>
        <div
          class="middle"
          @touchstart.prevent='onTouchstart'
          @touchmove.prevent='onTouchmove'
          @touchend.prevent='onTouchend(playerHeight, goBack)'
        >
          <div class="record_wrapper">
            <div class="record_content">
              <img
                class="record_img playing"
                :class="recordCls"
                :src="currentSong.pic"
              />
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-bar-wrapper">
            <span class="time">{{ formatTime(currentTime) }}</span>
            <div class="progress">
              <ProgressBar
                :progress="progress"
                @time-changing="onTimeChanging"
                @time-changed="onTimeChanged(rootHeight)"
                ref="barRef"
              />
            </div>
            <span class="time">{{ formatTime(currentSong.duration) }}</span>
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
              <i
                :class="favoriteCls(currentSong)"
                @click="handleFavorite(currentSong)"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <MiniPlayer
      v-show="!fullScreen && playlist.length"
      :togglePlay="togglePlay"
      :playlist="playlist"
    />
    <audio
      ref="audioRef"
      @pause="handlePause"
      @play="handlePlay"
      @canplay="handleReady"
      @error="handleError"
      @ended="handleEnded"
      @timeupdate="updateTime"
    />
  </div>
</template>

<script>
import { computed, nextTick, provide, readonly, ref, watch } from 'vue'
import { useStore } from 'vuex'
import useMode from './use-mode.js'
import useFavorite from './use-favorite.js'
import useRecord from './use-record.js'
import useGesture from './use-gesture.js'
import { PLAY_MODE } from '../../assets/js/constant.js'
import { formatTime } from '../../assets/js/util.js'
import ProgressBar from './progress-bar.vue'
import MiniPlayer from './mini-player.vue'
export default {
  name: 'player',
  components: { ProgressBar, MiniPlayer },
  setup () {
    const store = useStore()
    const audioRef = ref(null)
    const songReady = ref(false)
    const barRef = ref(null)
    const currentTime = ref(0)
    let touching = false
    const playerRef = ref(null)
    const playerHeight = ref(0)

    const { modeIcon, changeMode } = useMode()
    const { favoriteCls, handleFavorite } = useFavorite()
    const { recordCls } = useRecord()
    const { onTouchstart, onTouchmove, onTouchend, gestureStyle } = useGesture()

    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.state.playing)
    const currentIndex = computed(() => store.state.currentIndex)
    const playlist = computed(() => store.state.playlist)

    const playIcon = computed(() => playing.value ? 'icon-pause' : 'icon-play')
    const disableCls = computed(() => songReady.value ? '' : 'disable') // 对于其他函数改变的数据有关，可以使用computed
    const progress = computed(() => currentTime.value / currentSong.value.duration)

    provide('songReady', readonly(songReady))

    watch(currentSong, newSong => {
      if (playlist.value.length <= 0) {
        store.commit('setPlayingState', false)
      }
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

    watch(fullScreen, async newFullScreen => {
      if (newFullScreen) {
        await nextTick()
        barRef.value.setOffset(progress.value)
        if (!playerHeight.value) {
          playerHeight.value = playerRef.value.offsetHeight
        }
      }
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
    function handlePlay () { // 此处是处理其他原因导致歌曲播放情况
      if (playing.value === true) {
        return
      }
      store.commit('setPlayingState', true)
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
      currentTime.value = 0
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
    function updateTime (e) { // 别忘了切换歌曲时，currentTime置0
      if (touching) {
        return
      }
      currentTime.value = e.target.currentTime
    }
    function onTimeChanging (prog) {
      // console.log(prog)
      touching = true
      currentTime.value = currentSong.value.duration * prog
      // console.log(currentTime.value)
    }
    function onTimeChanged (prog) {
      console.log('end')
      touching = false
      audioRef.value.currentTime = currentTime.value = currentSong.value.duration * prog
    }
    return {
      audioRef,
      fullScreen,
      currentSong,
      goBack,
      playlist,
      playIcon,
      togglePlay,
      handlePause,
      handlePlay,
      handlePrev,
      handleNext,
      handleReady,
      disableCls,
      handleError,
      modeIcon,
      changeMode,
      favoriteCls,
      handleFavorite,
      handleEnded,
      progress,
      updateTime,
      currentTime,
      formatTime,
      onTimeChanging,
      onTimeChanged,
      recordCls,
      barRef,
      // gesture
      playerRef,
      playerHeight,
      onTouchstart,
      onTouchmove,
      onTouchend,
      gestureStyle
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
  .middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    .record_wrapper {
      width: 100%;
      height: 0;
      padding-bottom: 80%;
      position: relative;
      .record_content {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
        .record_img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 10px solid rgba(255, 255, 255, 0.1);
          box-sizing: border-box;
        }
        .playing {
          animation: rotate 20s linear infinite;
        }
        .play-pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 50px;
    width: 100%;
    .progress-bar-wrapper {
      width: 80%;
      display: flex;
      margin: 0 auto;
      padding: 10px 0;
      .progress {
        flex: 1 0 40px;
        margin: 0 5px;
      }
      .time {
        width: 40px;
        height: 30px;
        line-height: 32px;
        text-align: center;
        font-size: $font-size-small;
      }
    }
    .operators {
      display: flex;
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
}
</style>
