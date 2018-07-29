import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  post: {
    _id: '',
    title: '',
    date: '',
    url: '',
    id: '',
    author: '',
    markdown: '',
    content: '',
    summary: ''
  }
}

const postModule = {
  state,
  mutations,
  actions,
  getters
}

export default postModule
