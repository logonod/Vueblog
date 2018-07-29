import axios from 'axios'
import router from '../../../router'

export default {
  getPostItems ({ commit }, {user}) {
    axios.get(`/api/users/${user}`).then((response) => {
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
    axios.delete(`/api/posts/${id}`).then((response) => {
      commit('REMOVE_POST_ITEM', {id})
    })
  },
  createPost ({ commit }, {user}) {
    axios.post(`/api/users/${user}`).then((response) => {
      console.log(response.data)
      router.push({ path: `/${user}/${response.data.ops[0].id}/edit` })
    })
  }
}
