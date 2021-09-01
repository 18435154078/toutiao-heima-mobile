import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

Vue.use(Vuex)

const USE_KEY = 'toutiao-token'
const USE_CHANNEL = 'user-channel'
const USE_SEARCH = 'use-search-history'
const USER = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: {},
    token: getStorage(USE_KEY),
    userChannel: getStorage(USE_CHANNEL),
    searchHistory: getStorage(USE_SEARCH) || []
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
      setStorage(USER, state.user)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      setStorage(USE_KEY, state.token)
    },
    REMOVE_TOKEN: (state) => {
      state.token = null
      removeStorage(USE_KEY)
    },

    UPDATE_CHANNEL: (state, channels) => {
      state.userChannel = channels
      setStorage(USE_CHANNEL, state.userChannel)
    },

    UNDATE_SEARCH_HISTORY: (state, history) => {
      state.searchHistory = history
      setStorage(USE_SEARCH, state.searchHistory)
    }
  },
  actions: {
  },
  modules: {
  }
})
