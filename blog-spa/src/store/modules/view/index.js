import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  postItems: []
}

const viewModule = {
  state,
  mutations,
  actions,
  getters
}

export default viewModule
