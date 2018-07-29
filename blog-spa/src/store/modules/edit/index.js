import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  editPost: {
    _id: '',
    title: '',
    date: '',
    url: '',
    user: '',
    id: '',
    author: '',
    markdown: '',
    content: '',
    summary: ''
  },
  saveState: '保存'
}

const editModule = {
  state,
  mutations,
  actions,
  getters
}

export default editModule
