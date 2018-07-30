import axios from 'axios'
import router from '../../../router'

export default {
  getPost ({ commit }, {post}) {
    axios.get(`/api/post/${post}`).then((response) => {
      let post = response.data
      if (post) {
        const date = new Date(post.date)
        post.date =
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        commit('UPDATE_POST', {post})
      } else {
        router.push({ path: '/NotFound' })
      }
    })
  }
}
