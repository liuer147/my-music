<template>
  <teleport to='body'>
    <div class="confirm" v-show="visible" @click.self="hidden">
      <div class="confirm_content">
        <p class="title">{{title}}</p>
        <div class="confirm_operator">
          <span class="btn confirm_btn" @click.stop="confirm">{{confirmBtnText}}</span>
          <span class="btn" @click="hidden">{{cancelBtnText}}</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    title: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  emits: ['confirm'],
  methods: {
    show () {
      this.visible = true
    },
    hidden () {
      this.visible = false
    },
    confirm () {
      this.$emit('confirm')
      this.hidden()
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: rgba($color: #000000, $alpha: .2);
  display: flex;
  justify-content: center;
  align-items: center;
  .confirm_content {
    width: 270px;
    border-radius: 13px;
    background: $color-highlight-background;
    color: $color-text-ll;
    .title {
      line-height: 22px;
      font-size: $font-size-large;
      text-align: center;
      padding: 15px 20px;
    }
    .confirm_operator {
      line-height: 22px;
      display: flex;
      .btn {
        flex: 1;
        padding: 10px 0px;
        font-size: $font-size-large;
        text-align: center;
      }
      .confirm_btn {
        color: $color-theme;
      }
    }
  }
}
</style>
