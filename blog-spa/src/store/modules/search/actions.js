import axios from 'axios'
import router from '../../../router'

export default {
  getSearchResults ({ commit }, {keyword}) {
    axios.get(`/api/search?keyword=${keyword}`).then((response) => {
      let posts = response.data
      let date
      posts.map((post) => {
        date = new Date(post.date)
        post.date =
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        // change summary
        if (!post.title.includes(keyword)) {
          if (post.text.includes(keyword)) {
            let index = post.text.search(keyword)
            let firstIndex = 0
            let lastIndex = post.text.length
            if (index > 80) {
              firstIndex = index - 80
            }
            if (index < post.text.length - 80) {
              lastIndex = index + 80
            }
            post.summary = post.text.substring(firstIndex, lastIndex) + '...'
          }
        }
      })
      commit('UPDATE_SEARCH_RESULTS', {results: posts})
    })
  },
  createPost ({ commit }) {
    const token = window.localStorage.getItem('token')
    axios.post(`/api/post/?token=${token}`).then((response) => {
      router.push({ path: `/${response.data.ops[0].id}/edit` })
    })
  }
}
