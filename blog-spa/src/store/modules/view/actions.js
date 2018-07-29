import axios from 'axios'
import router from '../../../router'

export default {
  getPostItems ({ commit }) {
    axios.get('/api/post/').then((response) => {
      let posts = response.data
      let date
      posts.map((post) => {
        date = new Date(post.date)
        post.date =
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      })
      commit('UPDATE_POST_ITEMS', {posts})
    })
  },
  removePost ({ commit }, {id}) {
    const token = window.localStorage.getItem('token')
    axios.delete(`/api/post/${id}?token=${token}`).then((response) => {
      commit('REMOVE_POST_ITEM', {id})
    })
  },
  createPost ({ commit }) {
    const token = window.localStorage.getItem('token')
    axios.post(`/api/post/?token=${token}`).then((response) => {
      router.push({ path: `/${response.data.ops[0].id}/edit` })
    })
  }
}
