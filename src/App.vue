<template>
  <MyHeader />
  <Tab />
  <router-view></router-view>
  <player></player>
</template>

<script>
import MyHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from './components/player/player.vue'
export default {
  components: {
    MyHeader,
    Tab,
    Player
  }
}
</script>

<style lang="scss">
</style>
