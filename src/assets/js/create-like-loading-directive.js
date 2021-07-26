import { createApp } from 'vue'
import { addClass, removeClass } from './dom.js'

const relativeClass = 'g-relative'

export function createLikeLoadingDirective (comp) {
  const name = comp.name
  return {
    mounted (el, binding) {
      const app = createApp(comp)
      const instance = app.mount(document.createElement('div'))
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      const title = binding.arg
      if (title !== undefined) {
        instance.setTitle(title)
      }
      if (binding.value) {
        // console.log(el)
        append(el)
      }
    },
    updated (el, binding) {
      const title = binding.arg
      if (title !== undefined) {
        el[name].instance.setTitle(title)
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
    el.appendChild(el[name].instance.$el)
  }

  function remove (el) {
    removeClass(el, relativeClass)
    el.removeChild(el[name].instance.$el)
  }
}
