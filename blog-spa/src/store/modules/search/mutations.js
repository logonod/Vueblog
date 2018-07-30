export default {
  UPDATE_SEARCH_RESULTS (state, {results}) {
    state.searchResults = results
  },
  UPDATE_SEARCH_KEYWORD (state, {keyword}) {
    state.searchKeyword = keyword
  }
}
