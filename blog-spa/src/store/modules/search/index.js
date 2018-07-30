import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  searchResults: [],
  searchKeyword: ''
}

const saerchModule = {
  state,
  mutations,
  actions,
  getters
}

export default saerchModule
