<template>
<div>
  <textarea class="textarea is-fullheight"
   placeholder="开启Markdown写作之旅..."
   v-model="markdownContent" @keyup="resetSaveState"></textarea>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'EditArea',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'editPost'
    ]),
    markdownContent: {
      get () {
        return this.editPost.markdown
      },
      set (value) {
        this.$store.commit('UPDATE_POST_MARKDOWN', {markdown: value})
      }
    }
  },
  methods: {
    ...mapMutations({
      updateSaveState: 'UPDATE_SAVE_STATE'
    }),
    resetSaveState () {
      this.updateSaveState({saved: '保存'})
    }
  }
}
</script>

<style scoped lang="scss">
@import "~bulma/bulma";
.textarea.is-fullheight {
  min-height: 100vh;
}
</style>
