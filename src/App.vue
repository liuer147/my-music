<template>
  <MyHeader />
  <Tab />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :style="bottomStl" />
    </keep-alive>
  </router-view>
  <router-view name="User" v-slot="{ Component }">
    <transition name="slide">
      <keep-alive>
        <component :is="Component" :style="bottomStl" />
      </keep-alive>
    </transition>
  </router-view>
  <player></player>
</template>

<script>
import MyHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from './components/player/player.vue'
import { mapState } from 'vuex'
export default {
  components: {
    MyHeader,
    Tab,
    Player
  },
  computed: {
    bottomStl () {
      const bottom = this.playlist.length ? '60px' : ''
      return {
        bottom
      }
    },
    ...mapState(['playlist'])
  }
}
</script>

<style lang="scss"></style>
