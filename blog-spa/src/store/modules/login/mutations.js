export default {
  SET_TOKEN (state, token) {
    state.token = token
  },
  LOGIN_PENDING (state) {
    state.loginLoading = true
  },
  LOGIN_SUCCESS (state) {
    state.loginLoading = false
  }
}
