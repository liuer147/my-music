import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import '@/assets/scss/index.scss'
import { load, saveAll } from '@/assets/js/array-store'
import loadingDirective from '@/components/base/loading/directive.js'
import noResultDirective from '@/components/base/no-result/directive.js'
import { FAVORITE_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
  processSongs(favoriteSongs).then((songs) => {
    store.commit('setFavorite', songs)
    saveAll(songs, FAVORITE_KEY)
  })
}

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, {
    loading: require('@/assets/images/default.png')
  })
  .directive('no-result', noResultDirective)
  .directive('loading', loadingDirective)
  .mount('#app')
