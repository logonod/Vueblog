<template>
<article class="article-card">
  <h2 class="article-head">
    <a :href="result.url">{{result.title}}</a>
  </h2>
  <p class="article-date">{{result.date}}</p>
  <div class="article-summary">{{result.summary}}</div>
  <a class="more has-margin-right" :href="result.url" target=”_blank”>
    Read more
  </a>
</article>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ResultCard',
  props: ['result'],
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([

    ])
  },
  methods: {
    ...mapMutations({

    }),
    ...mapActions([
      'removePost'
    ])
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
.has-margin-right {
  margin-right: 10px;
}
</style>
