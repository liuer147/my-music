import MusicList from '../../music-list/music-list.vue'
import { processSongs } from '../../../service/song.js'
import storage from 'good-storage'

export default function createDetailComponent (name, KEY, getDataDetail) {
  return {
    name,
    components: {
      MusicList
    },
    props: {
      data: Object
    },
    data () {
      return {
        songs: [],
        loading: true
      }
    },
    computed: {
      computedData () {
        let ret = null
        if (this.data) {
          ret = this.data
        } else {
          const cacheData = storage.session.get(KEY)
          // !注意cacheData.id 是数字类型，必须转换为字符串类型，一般id貌似都是数字类型
          if (cacheData && (cacheData.mid || cacheData.id + '') === this.$route.params.id) { // 如果有缓存computedData且缓存的singer.mid和当前路由的id相同，次id为参数时
            ret = cacheData
          }
        }
        return ret
      },
      pic () {
        const computedData = this.computedData
        // console.log('pic: ', this.computedData.pic)
        return computedData && computedData.pic
      },
      title () {
        const computedData = this.computedData
        return computedData && (computedData.name || computedData.title)
      }
    },
    async created () {
      const computedData = this.computedData
      if (!computedData) {
        const path = this.$route.matched[0].path
        this.$router.push({
          path
        })
        return
      }
      const result = await getDataDetail(computedData)
      // console.log(result)
      this.songs = await processSongs(result.songs)
      this.loading = false
    }
  }
}
