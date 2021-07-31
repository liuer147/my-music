export const currentSong = state => {
  return state.playlist[state.currentIndex] || {} // 是为了在取不到值的时候不为undefined
}
