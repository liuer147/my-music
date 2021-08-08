<template>
  <div class="singer-wrapper" v-loading="!singers.length">
    <index-list
      v-if="singers.length"
      :singers="singers"
      @select="selectSinger"
    />
    <router-view v-slot="{ Component }"><!-- 路由过渡效果！ -->
      <transition name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer.js'
import indexList from '@/components/index-list/index-list.vue'
import { SINGER_KEY } from '@/assets/js/constant.js'
import storage from 'good-storage'

export default {
  components: { indexList },
  name: 'singer',
  data () {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created () {
    const result = await getSingerList()
    this.singers = result.singers
    // console.log(result)
  },
  methods: {
    selectSinger (singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`
      })
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-wrapper {
  position: fixed;
  top: 88px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}
</style>
