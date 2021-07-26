<template>
  <div class="no-result">
    <div class="bgImg" />
    <p class="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'no-result',
  props: {
    title: {
      type: String,
      default: '抱歉,没找到歌曲'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-result {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  .bgImg {
    width: 86px;
    height: 90px;
    margin: 0 auto;
    @include bg-image('no-result');
    background-size: 86px 90px;
  }
  .title {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text-d;
  }
}
</style>
