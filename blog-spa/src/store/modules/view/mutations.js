export default {
  UPDATE_POST_ITEMS (state, {posts}) {
    state.postItems = posts
  },
  REMOVE_POST_ITEM (state, {id}) {
    const postIndexToRemove = state.postItems.findIndex(postItem => postItem['_id'] === id)
    state.postItems.splice(postIndexToRemove, 1)
  }
}
