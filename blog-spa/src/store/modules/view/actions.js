import axios from 'axios'

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
      console.log(response.data)
      // commit('UPDATE_POST_ITEMS', {posts})
    })
  }
}
