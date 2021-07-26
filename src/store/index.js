import { createLogger, createStore } from 'vuex'

import state from './state.js'
import mutations from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
