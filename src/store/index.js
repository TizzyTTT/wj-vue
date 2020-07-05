import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 这里语法很有趣，存储就是 vuex.store
// 路由即 new router
export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }
  },
  // 这里的login和Login.vue里面的click是绑定的
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
