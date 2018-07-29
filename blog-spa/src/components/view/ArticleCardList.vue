<template>
<div>
  <ArticleCard v-for="post in postItems" :key="post['_id']"
   :article="post" />
</div>
</template>

<script>
import ArticleCard from './ArticleCard'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ArticleCardList',
  props: ['userName'],
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
    ])
  },
  methods: {
    ...mapMutations({

    }),
    updateInitialState () {
      const user = this.userName
      this.$store.dispatch('getPostItems', {user})
    }
  },
  created () {
    this.updateInitialState()
  }
}
</script>

<style scoped lang="scss">

</style>
