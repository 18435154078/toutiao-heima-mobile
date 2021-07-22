import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

Vue.use(Vuex)

const USE_KEY = 'toutiao-token'
const USE_CHANNEL = 'user-channel'

export default new Vuex.Store({
  state: {
    token: getStorage(USE_KEY),
    userChannel: getStorage(USE_CHANNEL)
  },
  mutations: {
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
    }
  },
  actions: {
  },
  modules: {
  }
})
