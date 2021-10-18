import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/recommend.vue' /* webpackChunkName: "Recommend" */)
const Singer = () => import('@/views/singer.vue' /* webpackChunkName: "Singer" */)
const TopList = () => import('@/views/top-list.vue' /* webpackChunkName: "TopList" */)
const Search = () => import('@/views/search.vue' /* webpackChunkName: "Search" */)
const SingerDetail = () => import('@/views/singer-detail.vue' /* webpackChunkName: "SingerDetail" */)
const Album = () => import('@/views/album-detail.vue' /* webpackChunkName: "Album" */)
const TopListDetail = () => import('@/views/top-list-detail.vue' /* webpackChunkName: "TopListDetail" */)
const User = () => import('@/views/user-center.vue' /* webpackChunkName: "userCenter" */)
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopListDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    components: {
      User
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
