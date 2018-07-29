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
    ])
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
