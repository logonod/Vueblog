import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  username: '',
  password: ''
}

const loginModule = {
  state,
  mutations,
  actions,
  getters
}

export default loginModule
