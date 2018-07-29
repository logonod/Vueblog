<template>
<article class="article-card">
  <h2 class="article-head">
    <a :href="article.url">{{article.title}}</a>
  </h2>
  <p class="article-date">{{article.date}}</p>
  <div class="article-summary">{{article.summary}}</div>
  <a class="more has-margin-right" :href="article.url" target=”_blank”>
    Read more
  </a>
  <router-link v-if="logined" :to="`${article.url}/edit`"
    class="more has-margin-right">
    Edit
  </router-link>
  <a v-if="logined" class="more has-margin-right"
    href="#" @click="deleteArticle">Delete</a>
</article>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ArticleCard',
  props: ['article', 'logined'],
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
    ]),
    deleteArticle () {
      this.removePost({id: this.$vnode.key})
    }
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
