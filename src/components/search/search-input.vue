<template>
  <div class="search-input">
    <i class="icon-search" />
    <input class="input-inner" :placeholder="placeHolder" v-model="inputVal" />
    <i v-show="inputVal" class="icon-dismiss" @click="dismiss" />
  </div>
</template>

<script>
// import { deBounce } from '../../assets/js/util'
import { debounce } from 'throttle-debounce'
export default {
  name: 'search-input',
  props: {
    placeHolder: {
      type: String,
      default: '搜索歌曲，歌手'
    },
    modelValue: String
  },
  emits: ['update:modelValue'],
  computed: {
    inputVal: {
      get () {
        return this.modelValue
      },
      set: debounce(300, true, function (value) {
        this.$emit('update:modelValue', value)
      })
    }
  },
  methods: {
    dismiss () {
      this.inputVal = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
