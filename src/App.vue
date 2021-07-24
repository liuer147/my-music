<template>
  <MyHeader />
  <Tab />
  <router-view></router-view>
</template>

<script>
import MyHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
export default {
  components: {
    MyHeader,
    Tab
  }
}
</script>

<style lang="scss">
</style>
