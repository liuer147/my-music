<template>
  <div class="search" v-loading="loading">
    <div class="search-input-wrapper">
      <SearchInput v-model="query" />
    </div>
    <div class="hot-keys" v-show="!query">
      <h2 class="title">热门搜索</h2>
      <ul>
        <li
          class="item"
          v-for="item of hotKeys"
          :key="item.id"
          @click="selectHotKey(item)"
        >
          <span>{{ item.key }}</span>
        </li>
      </ul>
    </div>
    <div class="search-result" v-show="query">
      <Suggest :query="query" />
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import SearchInput from '../components/search/search-input.vue'
import { getHotKeys } from '../service/search'
import Suggest from '../components/search/suggest.vue'
export default {
  components: { SearchInput, Suggest },
  name: 'search',
  setup () {
    const query = ref('')
    const hotKeys = ref([])
    const loading = ref(true)
    getHotKeys().then(res => {
      hotKeys.value = res.hotKeys
      loading.value = false
    })

    function selectHotKey (hotKey) {
      query.value = hotKey.key
    }
    return {
      hotKeys,
      query,
      selectHotKey,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .hot-keys {
    margin: 0 20px 20px 20px;
    .title {
      margin-bottom: 20px;
      font-size: $font-size-medium;
      color: $color-text-l;
    }
    .item {
      display: inline-block;
      padding: 5px 10px;
      margin: 0 20px 10px 0;
      border-radius: 6px;
      background: $color-highlight-background;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
