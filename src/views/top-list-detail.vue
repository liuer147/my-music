<template>
  <div class="detail">
    <MusicList
      :title="title"
      :pic='pic'
      :loading='loading'
      :songs='songs'
      :rank='true'
    />
  </div>
</template>

<script>
import createDetailComponent from '../components/base/create-detail-component/index'
import { TOP_KEY } from '../assets/js/constant'
import { getTopDetail } from '../service/top-list'
export default createDetailComponent('top-list-detail', TOP_KEY, getTopDetail)
</script>

<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: $color-background;
}
</style>
