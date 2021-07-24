<template>
  <div class="singer-wrapper" v-loading='!singers.length'>
    <index-list v-if="singers.length" :singers="singers" />
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer.js'
import indexList from '../components/base/index-list/index-list.vue'
export default {
  components: { indexList },
  name: 'singer',
  data () {
    return {
      singers: []
    }
  },
  async created () {
    const result = await getSingerList()
    this.singers = result.singers
    console.log(result)
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
