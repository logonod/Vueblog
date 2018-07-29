export default {
  UPDATE_EDIT_POST (state, {editPost}) {
    state.editPost = editPost
  },
  UPDATE_SAVE_STATE (state, {saved}) {
    state.saveState = saved
  },
  UPDATE_POST_MARKDOWN (state, {markdown}) {
    state.editPost.markdown = markdown
  },
  UPDATE_POST_CONTENT (state, {content}) {
    state.editPost.content = content
  },
  UPDATE_POST_TITLE (state, {title}) {
    state.editPost.title = title
  },
  UPDATE_POST_SUMMARY (state, {summary}) {
    state.editPost.summary = summary
  }
}
