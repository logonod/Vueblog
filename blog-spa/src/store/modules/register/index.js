import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  username: '',
  password: '',
  passwordAgain: ''
}

const registerModule = {
  state,
  mutations,
  actions,
  getters
}

export default registerModule
