<template>
  <div class="detail">
    <MusicList
      :loading="loading"
      :songs="songs"
      :pic="pic"
      :title="title"
    ></MusicList>
  </div>
</template>

<script>
import { getSingerDetail } from '../service/singer.js'
import { processSongs } from '../service/song.js'
import MusicList from '@/components/music-list/music-list.vue'
import { SINGER_KEY } from '@/assets/js/constant.js'
import storage from 'good-storage'
export default {
  name: 'singer-detail',
  components: {
    MusicList
  },
  props: {
    singer: Object
  },
  data () {
    return {
      songs: [],
      loading: true
    }
  },
  computed: {
    computedSinger () {
      let ret = null
      if (this.singer) {
        ret = this.singer
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY)
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) { // 如果有缓存singer且缓存的singer.mid和当前路由的id相同，次id为参数时
          ret = cachedSinger
        }
      }
      return ret
    },
    pic () {
      const singer = this.computedSinger
      // console.log('pic: ', this.singer.pic)
      return singer && singer.pic
    },
    title () {
      const singer = this.computedSinger

      return singer && singer.name
    }
  },
  async created () { // created()钩子函数是什么时候执行的？
    const singer = this.computedSinger
    if (!singer) {
      const path = this.$route.matched[0].path // ?这句话什么意思，知识点在哪里
      this.$router.push({
        path
      })
      return
    }
    const result = await getSingerDetail(singer)
    this.songs = await processSongs(result.songs)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
