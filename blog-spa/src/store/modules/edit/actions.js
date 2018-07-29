import axios from 'axios'

const highlight = require('hexo-util/lib/highlight')

const ctx = {
  config: {
    marked: {
      langPrefix: '',
      highlight: function (code, lang) {
        return highlight(code, {lang: lang})
      }
    }
  }
}

const r = require('../../../lib/renderer').bind(ctx)

var remark = require('remark')

var strip = require('strip-markdown')

export default {
  getEditPost ({ commit }, {post}) {
    axios.get(`/api/post/${post}`).then((response) => {
      let editPost = response.data
      const date = new Date(editPost.date)
      editPost.date =
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      commit('UPDATE_EDIT_POST', {editPost})
    })
  },
  renderMarkdown ({ commit, state }) {
    const result = r({text: state.editPost.markdown}, {autolink: true})
    commit('UPDATE_POST_CONTENT', {'content': result})
  },
  renderSummary ({ commit, state }) {
    remark()
      .use(strip)
      .process(state.editPost.markdown, function (err, file) {
        if (err) throw err
        commit('UPDATE_POST_SUMMARY', {'summary':
          String(file).substring(0, 160) + '...'})
        commit('UPDATE_POST_TEXT', {'text':
          String(file)})
      })
  },
  postEditPost ({ commit, state }, {post}) {
    const token = window.localStorage.getItem('token')
    axios.put(`/api/post/${post}?token=${token}`, state.editPost)
      .then((response) => {})
  }
}
