import Vue from 'vue'
import Vuex from 'vuex'
import edit from './modules/edit'
import login from './modules/login'
import post from './modules/post'
import view from './modules/view'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    edit,
    login,
    post,
    view,
    search
  }
})
