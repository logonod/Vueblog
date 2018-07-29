import Vue from 'vue'
import Vuex from 'vuex'
import edit from './modules/edit'
import login from './modules/login'
import post from './modules/post'
import register from './modules/register'
import view from './modules/view'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    edit,
    login,
    post,
    register,
    view
  }
})
