<template>
<div>
  <header :class="{ 'fixed-header' : fixedHeader, 'header': true}">
    <div class="header-container">
      <a class="home-link" href="/">
        <div class="logo"></div>
        <span>{{editPost.author}}</span>
      </a>
      <ul class="right-list">
        <li class="list-item">
          <router-link to="/" class="item-link">
            文章
          </router-link>
        </li>
        <li class="list-item">
          <a href="#" class="item-link active">发布</a>
        </li>
        <li class="list-item">
          <router-link to="/login" class="item-link">
            登录
          </router-link>
        </li>
        <li class="list-item">
          <a href="#" class="item-link">退出</a>
        </li>
      </ul>
      <div class="menu" @click="toggleMenu">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </div>
      <div :class="{ 'open' : menuOpen, 'menu-mask': true}">
        <ul class="menu-list">
          <li class="menu-item">
            <a href="/" class="menu-link">Home</a>
          </li>
          <li class="menu-item">
            <a href="/tags/" class="menu-link">Tags</a>
          </li>
          <li class="menu-item">
            <a href="/archives/" class="menu-link">Archives</a>
          </li>
          <li class="menu-item">
            <a href="/project/" class="menu-link">Projects</a>
          </li>
          <li class="menu-item">
            <a href="/about/" class="menu-link">About</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div id="article-banner" :style="{ 'background-image': geoPattern }">
    <h2 :class="{ 'hidden' : contentHidden}">
      <span v-if="!editTitle" class="has-min-width"
        @click="setEditTitle">{{editPost.title}}</span>
      <input v-if="editTitle" v-model="postTitleContent"
        @keyup.enter="setUnEditTitle" class="title-input"
        @blur="setUnEditTitle" @keyup="resetSaveState" />
    </h2>
    <p :class="{ 'hidden' : contentHidden,
    'post-date': true}">{{editPost.date}}</p>
    <div :class="{ 'hidden' : contentHidden, 'arrow-down': true}"
      @click="scrollToContent">
      <a href="javascript:;"></a>
    </div>
  </div>
  <main :class="{ 'hidden' : contentHidden,
  'app-body': true, 'flex-box': true}">
  <!-- Article START -->
  <article class="post-article">
    <EditTab :postID="postID" />
  </article>
  </main>
  <div :class="{ 'opacity' : topButtonHidden, 'scroll-top': true}"
   @click="scrollToTop">
    <span class="arrow-icon"></span>
  </div>
  <div class="image-view-wrap" :class="{ 'wrap-active': wrapAtive,
    'image-view-wrap': true }" v-if="wrapAtive" @click="closeImageView" >
    <div class="image-view-inner">
      <img :src="imageSrc" :width="imageWidth"
        :style="{ transform: `translate3d(0, ${this.transY}px, 0) scale3d(${ this.zoom }, ${ this.zoom }, 1)` }" />'
    </div>
  </div>
  <footer class="app-footer">
    <p class="copyright">
      © 2018 | Proudly powered by <a href="https://vuejs.org/" target="_blank">Vue</a>
      <br>
      Theme by <a href="https://github.com/yanm1ng">yanm1ng</a>
    </p>
  </footer>
</div>
</template>

<script>
import EditTab from './EditTab.vue'
import { mapGetters, mapMutations } from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
var GeoPattern = require('geopattern')

export default {
  name: 'EditPage',
  props: ['postID'],
  components: {
    EditTab
  },
  data () {
    return {
      contentHidden: true,
      topButtonHidden: true,
      isOpen: false,
      fixedHeader: true,
      menuOpen: false,
      geoPattern: '',
      imageSrc: '',
      imageWidth: '',
      transY: '',
      zoom: '1',
      wrapAtive: false,
      rendered: false,
      editTitle: false
    }
  },
  computed: {
    ...mapGetters([
      'editPost'
    ]),
    postTitleContent: {
      get () {
        return this.editPost.title
      },
      set (value) {
        this.$store.commit('UPDATE_POST_TITLE', {title: value})
      }
    }
  },
  methods: {
    ...mapMutations({
      updateSaveState: 'UPDATE_SAVE_STATE'
    }),
    resetSaveState () {
      this.updateSaveState({saved: '保存'})
    },
    setEditTitle () {
      this.editTitle = true
    },
    setUnEditTitle () {
      this.editTitle = false
    },
    toggleMenu () {
      if (!this.fixedHeader || this.isOpen) {
        this.fixedHeader = !this.fixedHeader
        this.isOpen = !this.isOpen
      }
      this.menuOpen = !this.menuOpen
    },
    closeImageView () {
      this.wrapAtive = false
      window.document.documentElement.removeAttribute('style')
    },
    scrollToContent () {
      const banner = this.$el.querySelector('#article-banner')
      const header = this.$el.querySelector('.header')
      const body = window.document.documentElement ||
        window.document.body
      let currentY = body.scrollTop
      const targetY = banner.offsetHeight - header.offsetHeight
      const step = parseInt(targetY - currentY) / 30
      setTimeout(function animate () {
        currentY += step
        body.scrollTop = currentY
        if (currentY < targetY) {
          setTimeout(animate, 16)
        }
      }, 16)
    },
    scrollToTop () {
      const body = window.document.documentElement ||
        window.document.body
      let currentY = body.scrollTop
      const step = parseInt(currentY) / 36
      setTimeout(function animate () {
        currentY -= step
        body.scrollTop = currentY
        if (currentY > 0) {
          setTimeout(animate, 16)
        }
      }, 16)
    },
    updateInitialState () {
      const post = this.postID
      this.$store.dispatch('getEditPost', {post})
    }
  },
  created () {
    NProgress.start()
    this.updateInitialState()
    this.fixedHeader = false
  },
  mounted () {
    let that = this
    const header = this.$el.querySelector('.header')
    const banner = this.$el.querySelector('#article-banner')
    const headerH = header.clientHeight
    window.document.addEventListener(
      'scroll', function () {
        const scrollTop = window.document.documentElement.scrollTop ||
          window.document.body.scrollTop
        if (banner) {
          if (scrollTop > headerH) {
            that.fixedHeader = true
          } else if (scrollTop === 0) {
            that.fixedHeader = false
          }
        }
        if (scrollTop > 100) {
          that.topButtonHidden = true
        } else {
          that.topButtonHidden = false
        }
      }
    )
  },
  updated: function () {
    const that = this
    this.$nextTick(function () {
      if (!this.rendered) {
        this.rendered = true
        setTimeout(function () {
          NProgress.done()
          that.contentHidden = false
        }, 200)
        const pattern = GeoPattern.generate(this.editPost.url)
        this.geoPattern = pattern.toDataUrl()
      }
    })
  }
}
</script>

<style scoped>
.has-min-width {
  min-width: 100px;
}
.title-input {
  font-size: 2.2rem;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  color: #fff;
  text-shadow: 0 0 40px #34495e;
  font-weight: bold;
  text-align: center;
  background: none;
  border: 0;
  border-bottom: 1px solid white;
}
</style>
