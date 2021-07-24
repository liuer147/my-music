import axios from 'axios'

const ERR_OK = 0
const baseURL = '/'

axios.defaults.baseURL = baseURL

export function get (url, params) { // 封装的意义，使得对结果码的处理在函数内部实现
  return axios.get(url, {
    params
  }).then(res => {
    const serverData = res.data
    if (serverData.code === ERR_OK) {
      return serverData.result
    }
  }).catch(e => {
    console.error(e)
  })
}
