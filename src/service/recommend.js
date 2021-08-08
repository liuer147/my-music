import { get } from './base.js'

export function getRecommend () {
  return get('/api/getRecommend')
}

export function getAlbumDetail (album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}
