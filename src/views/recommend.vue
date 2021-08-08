<template>
  <div class="recommend" v-loading="loading">
    <Scroll class="recommend_content">
      <div>
        <div class="slider_wrapper">
          <div class="slider_content">
            <Slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend_list">
          <h1 class="list_title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item of albums"
              :key="item.id"
              class="item"
              @click="selectAlbum(item)"
            >
              <div class="icon">
                <img height="60" width="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.username }}</h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" :data="selectedAlbum" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getRecommend } from '@/service/recommend.js'
import Slider from '@/components/base/slider/slider.vue'
import Scroll from '@/components/wrap-scroll/wrap-scroll.js'
import { ALBUM_KEY } from '../assets/js/constant'
import storage from 'good-storage'
export default {
  name: 'recommend',
  data () {
    return {
      sliders: [],
      albums: [],
      selectedAlbum: null
    }
  },
  computed: {
    loading () {
      return !this.sliders.length && !this.albums.length
    }
  },
  components: {
    Slider,
    Scroll
  },
  async created () {
    const result = await getRecommend()
    this.sliders = result.sliders
    this.albums = result.albums
    // console.log(result)
  },
  methods: {
    selectAlbum (album) {
      this.selectedAlbum = album
      this.cacheAlbum(album)
      this.$router.push({
        path: `/recommend/${album.id}`
      })
    },
    cacheAlbum (album) {
      storage.session.set(ALBUM_KEY, album)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  // overflow: scroll;
  .recommend_content {
    height: 100%;
    overflow: hidden;
    .slider_wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider_content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend_list {
      .list_title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
