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
import { getAlbumDetail } from '../service/recommend.js'
import { ALBUM_KEY } from '@/assets/js/constant.js'
import createDetailComponent from '@/components/base/create-detail-component/index.js'
export default createDetailComponent('album-detail', ALBUM_KEY, getAlbumDetail)
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
