<template>
<div>
    <div class="tabs">
      <ul>
        <li :class="{ 'is-active' : isEdit}" @click="setEdit"><a>写作</a></li>
        <li :class="{ 'is-active' : !isEdit}" @click="setPreview"><a>预览</a></li>
      </ul>
      <a @click="savePost"
        :class="{ 'has-text-link' : saveState === '保存',
        'has-text-success': saveState === '已保存',
        'has-text-primary': saveState === '已保存'}"
      class="has-text-link"><span v-if="saveState === '正在保存'" class="has-margin-right fa fa-spinner fa-spin"></span><span v-if="saveState === '已保存'" class="has-margin-right fa fa-check"></span>{{saveState}}</a>
    </div>
  <EditArea v-if="isEdit" />
  <PreviewArea v-if="!isEdit" />
</div>
</template>

<script>
import EditArea from './EditArea.vue'
import PreviewArea from './PreviewArea.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'EditTab',
  props: ['userName', 'postID'],
  data () {
    return {
      isEdit: true
    }
  },
  computed: {
    ...mapGetters([
      'saveState'
    ])
  },
  methods: {
    ...mapMutations({
      updateSaveState: 'UPDATE_SAVE_STATE'
    }),
    setEdit () {
      this.updateSaveState({saved: '保存'})
      this.isEdit = true
    },
    setPreview () {
      this.$store.dispatch('renderMarkdown')
      this.$store.dispatch('renderSummary')
      this.isEdit = false
    },
    savePost () {
      const user = this.userName
      const post = this.postID
      if (this.saveState === '保存') {
        this.updateSaveState({saved: '正在保存'})
        this.$store.dispatch('renderMarkdown')
        this.$store.dispatch('renderSummary')
        this.$store.dispatch('postEditPost', {user, post})
        this.updateSaveState({saved: '已保存'})
      }
    }
  },
  components: {
    EditArea,
    PreviewArea
  }
}
</script>

<style scoped lang="scss">
@import "~bulma/bulma";
.has-margin-right {
  margin-right: 5px;
}
</style>
