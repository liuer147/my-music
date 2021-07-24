<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" />
    <p class="loading_text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      title: '加载中...'
    }
  },
  methods: {
    setTitle (newTitle) {
      this.title = newTitle
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  .loading_text {
    line-height: 20px;
    padding-left: 7px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>
