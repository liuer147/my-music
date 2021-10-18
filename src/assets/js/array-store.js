import storage from 'good-storage'

export function load (key) {
  return storage.get(key, [])
}

function insertArray (arr, val, compare) { // 这里并不一定是favorite歌曲列表情况，也有可能是其他数据，不一定包含id或者不一定使用id相等来判断，
  // 所以提供一个可以自行定义的compare参数
  const index = arr.findIndex(compare)
  if (index > -1) {
    return
  }
  arr.unshift(val)
}

function removeArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function save (key, item, compare) { // 获取storage里面的数据，以及插入新的数据(源storage里面没有)的数据数组，以便保存到全局store里面
  const list = storage.get(key, [])
  insertArray(list, item, compare)
  storage.set(key, list) // 别忘记保存到storage里面
  return list
}

export function remove (key, compare) {
  const list = storage.get(key, [])
  removeArray(list, compare)
  storage.set(key, list) // 别忘记保存到storage里面
  return list
}

export function saveAll(items, key) {
  storage.set(key, items)
}
