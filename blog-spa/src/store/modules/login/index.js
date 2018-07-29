import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  token: null,
  loginLoading: false
}

const loginModule = {
  state,
  mutations,
  actions,
  getters
}

export default loginModule
