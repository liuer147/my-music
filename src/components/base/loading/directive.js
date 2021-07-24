import { createApp } from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass } from '../../../assets/js/dom'

const relativeClass = 'g-relative'

const loadingDirective = {
  mounted (el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    const title = binding.arg
    if (title !== 'undefined') {
      instance.setTitle(title)
    }
    if (binding.value) {
      // console.log(el)
      append(el)
    }
  },
  updated (el, binding) {
    const title = binding.arg
    if (title !== 'undefined') {
      el.instance.setTitle(title)
    }

    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

/**
 * ~为什么此处的appendChild不能换成append???
 *  */

function append (el) {
  const style = getComputedStyle(el)
  if (!['absolute', 'fixed', 'relative'].includes(style.position)) {
    addClass(el, relativeClass) // 判断目标元素是否有非static定位，因为loading组件是absolute定位的，所以需要处理目标元素是static定位的情况
  }
  el.appendChild(el.instance.$el)
}

function remove (el) {
  removeClass(el, relativeClass)
  el.removeChild(el.instance.$el)
}

export default loadingDirective
