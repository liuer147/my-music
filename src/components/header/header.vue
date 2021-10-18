<template>
  <div class="header">
    <span class="icon" />
    <h1 class="text">Chicken Music</h1>
    <router-link to="/user">
      <i class="icon-mine" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MyHeader'
}
</script>

<style lang="scss" scoped>
.header {
  height: 44px;
  text-align: center;
  color: $color-theme;
  position: relative;
  .icon {
    display: inline-block;
    margin-top: 6px;
    vertical-align: top;/* 为啥通过vertical-align可以使text上升，又或者使icon添加margin-top又怎么会使text下降 */
    width: 30px;
    height: 32px;
    margin-right: 9px;
    @include bg-image('logo');
    background-size: 30px 32px; /* 可以通过背景来添加icon,css3里面的background-size可以调整宽高 */
  }
  .text {
    display: inline-block;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .icon-mine {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 26px;
    line-height: 24px;
    padding: 0 0 0 10px;
    color: $color-theme;
  }
}
</style>
