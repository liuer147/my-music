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
  console.log(list)
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

export function removeSong ({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice()
  const playlist = state.playlist.slice()

  const seqIndex = sequenceList.findIndex(item => item.id === song.id)
  const playIndex = playlist.findIndex(item => item.id === song.id)

  if (seqIndex < 0 || playIndex < 0) {
    console.warn('removeSong: 越界！')
  }

  sequenceList.splice(seqIndex, 1)
  playlist.splice(playIndex, 1)

  let currIndex = state.currentIndex
  console.log('currentIndex: ', currIndex, 'playIndex: ', playIndex)
  if (playIndex < currIndex) {
    currIndex--
  } else {
    currIndex %= playlist.length
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currIndex)
  // commit('s') 当playlist.length === 0时，设置播放状态为false
}

export function clearSong ({ commit, state }) {
  commit('setSequenceList', [])
  commit('setPlaylist', [])
  commit('setCurrentIndex', 0)
  // commit('s') 设置播放状态为false
}
export function addSong ({ commit, state }, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  const playIndex = findIndex(playlist, song)

  if (playIndex > -1) {
    currentIndex = playIndex
  } else {
    playlist.push(song)
    currentIndex = playlist.length - 1
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }

  commit('setSequenceList', sequenceList)
  commit('setPlaylist', playlist)
  commit('setCurrentIndex', currentIndex)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
}

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
