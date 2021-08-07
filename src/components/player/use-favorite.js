import { computed } from 'vue'
import { useStore } from 'vuex'
import { save, remove } from '../../assets/js/array-store'
import { FAVORITE_KEY } from '../../assets/js/constant'

export default function usefavorite () {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList) // 获取store和storage里面的数据

  const favoriteCls = song => {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  function handleFavorite (song) {
    let list
    if (isFavorite(song)) { // 以storage里面的数据为主，将store里面数据关联到storage
      list = remove(FAVORITE_KEY, compare)
    } else {
      list = save(FAVORITE_KEY, song, compare)
    }

    store.commit('setFavorite', list) // 别忘记保存到store里面

    function compare (item) { // 注意compare函数必须返回值
      return item.id === song.id
    }
  }

  function isFavorite (song) {
    // console.log('isFavorite: ', favoriteList.value.findIndex(song => song.id === currentSong.value.id))
    return favoriteList.value.findIndex(item => item.id === song.id) > -1
  }

  return {
    favoriteCls,
    handleFavorite
  }
}
