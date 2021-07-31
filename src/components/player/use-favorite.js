import { computed } from 'vue'
import { useStore } from 'vuex'
import { save, remove } from '../../assets/js/array-store'
import { FAVORITE_KEY } from '../../assets/js/constant'

export default function usefavorite () {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList) // 获取store和storage里面的数据
  const currentSong = computed(() => store.getters.currentSong)
  const favoriteCls = computed(() => isFavorite() ? 'icon-favorite' : 'icon-not-favorite')

  function handleFavorite () {
    let list
    if (isFavorite()) { // 以storage里面的数据为主，将store里面数据关联到storage
      list = remove(FAVORITE_KEY, compare)
    } else {
      list = save(FAVORITE_KEY, currentSong.value, compare)
    }

    store.commit('setFavorite', list) // 别忘记保存到store里面

    function compare (item) { // 注意compare函数必须返回值
      return item.id === currentSong.value.id
    }
  }

  function isFavorite () {
    // console.log('isFavorite: ', favoriteList.value.findIndex(song => song.id === currentSong.value.id))
    return favoriteList.value.findIndex(song => song.id === currentSong.value.id) > -1
  }

  return {
    favoriteCls,
    handleFavorite
  }
}
