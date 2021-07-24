<template>singer</template>

<script>
import { getSingerList } from '@/service/singer.js'
export default {
  name: 'singer',
  async created () {
    const result = await getSingerList()
    console.log(result)
  }
}
</script>

<style lang="scss" scoped>
</style>
