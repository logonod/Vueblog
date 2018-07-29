<template>
<div>
  <ArticleCard v-for="post in postItems" :key="post['_id']"
   :article="post" :logined="logined" />
</div>
</template>

<script>
import ArticleCard from './ArticleCard'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ArticleCardList',
  props: [],
  components: {
    ArticleCard
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'postItems'
    ]),
    logined () {
      const token = localStorage.getItem('token')
      if (token) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations({

    }),
    updateInitialState () {
      this.$store.dispatch('getPostItems')
    }
  },
  created () {
    this.updateInitialState()
  }
}
</script>

<style scoped lang="scss">

</style>
