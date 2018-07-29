<template>
<div class="page">
  <div class="container">
    <div class="columns">
      <div class="column is-6 column--align-center">
        <div id="login" class="box has-text-centered">
          <h2 class="title">文章发布系统</h2>
          <button @click="login"
            :class="[{'is-loading': loginLoading}, 'button is-primary']">
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  computed: {
    ...mapGetters([
      'loginLoading'
    ])
  },
  methods: {
    login () {
      this.$store.dispatch('login').then(() => {
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~bulma/bulma";
.box {
  padding: 30px;
}
.page {
  height: 100vh;
  background: #F2F6FA;
}
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.columns {
  width: 100%;
}
.column--align-center {
  margin: 0 auto;
}
</style>
