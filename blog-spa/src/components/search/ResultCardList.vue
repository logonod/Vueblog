<template>
<div>
  <ResultCard v-for="searchResult in searchResults" :key="searchResult['_id']"
   :result="searchResult" />
</div>
</template>

<script>
import ResultCard from './ResultCard'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ResultCardList',
  props: [],
  components: {
    ResultCard
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'searchResults',
      'searchKeyword'
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
      this.$store.dispatch('getSearchResults', {keyword: this.searchKeyword})
    }
  },
  created () {
    this.updateInitialState()
  }
}
</script>

<style scoped lang="scss">

</style>
