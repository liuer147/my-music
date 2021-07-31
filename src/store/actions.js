import { PLAY_MODE } from '../assets/js/constant.js'
import { shuffle } from '../assets/js/util.js'

export function selectPlay ({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', list)
  commit('setCurrentIndex', index)
}
export function randomPlay ({ commit }, { list }) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlaylist', shuffle(list))
  commit('setCurrentIndex', 0)
}

export function changeMode ({ commit, state, getters }, mode) {
  const list = state.sequenceList
  const currId = getters.currentSong.id
  if (mode === PLAY_MODE.random) {
    commit('setPlaylist', shuffle(list))
  } else {
    commit('setPlaylist', list)
  }
  const index = state.playlist.findIndex(song => song.id === currId) // 此处是playlist,而不是sequenceList！！
  commit('setCurrentIndex', index)
  commit('setPlayMode', mode)
}
