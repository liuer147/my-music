<template>
  <div class="progress-bar">
    <!-- 对于块级元素，其宽度默认就是100%所以不用再特意设置 -->
    <div class="iner-bar">
      <div class="progressed" :style="progressStl" />
      <div
        class="btn-wrapper"
        :style="btnStl"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="btn" />
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16

export default {
  name: 'progress-bar',
  props: {
    progress: { // 注意既然不好处理数值，那么就假设progress为百分比，即0-1之间的数值
      type: Number,
      default: 0
    }
  },
  emits: ['time-changing', 'time-changed'],
  data () {
    return {
      offset: 0
    }
  },
  computed: {
    progressStl () {
      return `width: ${this.offset}px`
    },
    btnStl () {
      return `transform: translate3d(${this.offset}px,0,0)`
    }
  },
  watch: {
    progress (newProgress) {
      const barWidth = this.$el.offsetWidth - progressBtnWidth
      this.offset = Math.max(0, Math.min(barWidth, barWidth * newProgress))
    }
  },
  created () {
    this.touch = {}
  },
  // mounted () {
  //   this.offsetWidth = this.$el.offsetWidth
  // },
  /**
   * ! 为什么在mounted钩子函数里面访问this.$el.offsetWidth为0
   *     mounted () {
    this.barWidth = this.$el.offsetWidth - progressBtnWidth
  },
  */
  methods: {
    onTouchStart (e) {
      // console.log(e.touches[0])
      // console.log(this.offset)
      // console.log(this.offsetWidth, this.$el.offsetWidth)
      this.touch.x1 = e.touches[0].pageX
      this.touch.startWidth = this.offset
      // console.log(this.offset)
    },
    onTouchMove (e) {
      const x2 = e.touches[0].pageX
      const barWidth = this.$el.offsetWidth - progressBtnWidth
      const dis = x2 - this.touch.x1
      // console.log(dis)
      const tempWidth = this.touch.startWidth + dis // here
      // console.log(this.touch.startWidth, dis)
      // console.log(this.offset, barWidth)
      const progress = Math.min(1, Math.max(0, tempWidth / barWidth))
      /**
       * !为什么不能直接设置this.offset?前面,tempWidth的时候
        */
      this.offset = barWidth * progress
      this.$emit('time-changing', progress)
    },
    onTouchEnd () {
      const barWidth = this.$el.offsetWidth - progressBtnWidth
      const progress = Math.min(1, Math.max(0, this.offset / barWidth))
      this.$emit('time-changed', progress)
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .iner-bar {
    position: relative;
    height: 4px;
    margin: 13px 0;
    border-radius: 2px;
    background: $color-background;
    .progressed {
      position: absolute;
      background: $color-theme;
      height: 100%;
    }
    .btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      // background: $color-text;
      .btn {
        position: relative;
        top: 7px;
        left: 7px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        line-height: 16px;
        background: $color-theme;
        box-sizing: border-box;
        border: 3px solid $color-text;
      }
    }
  }
}
</style>
