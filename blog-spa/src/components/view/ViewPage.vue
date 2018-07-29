<template>
<div>
  <header class="fixed-header header">
    <div class="header-container">
      <a class="home-link" href="/">
        <div class="logo"></div>
        <span>刘泽宇</span>
      </a>
      <ul class="right-list">
        <li class="list-item">
          <router-link to="/" class="item-link active">
            文章
          </router-link>
        </li>
        <li v-if="logined" class="list-item">
          <a href="#" class="item-link" @click="createPost">发布</a>
        </li>
        <li v-if="!logined" class="list-item">
          <router-link to="/login" class="item-link">
            登录
          </router-link>
        </li>
        <li v-if="logined" class="list-item">
          <a href="#" class="item-link" @click="logout">退出</a>
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
            <router-link to="/" class="menu-link active">
              文章
            </router-link>
          </li>
          <li v-if="logined" class="menu-item">
            <a href="#" class="menu-link" @click="createPost">发布</a>
          </li>
          <li v-if="!logined" class="menu-item">
            <router-link to="/login" class="menu-link">
              登录
            </router-link>
          </li>
          <li v-if="logined" class="menu-item">
            <a href="#" class="menu-link" @click="logout">退出</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <main :class="{ 'hidden' : contentHidden,
  'app-body': true}">
    <ArticleCardList />
  </main>
  <div :class="{ 'opacity' : topButtonHidden, 'scroll-top': true}"
   @click="scrollToTop">
    <span class="arrow-icon"></span>
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
import { mapGetters, mapMutations } from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ArticleCardList from './ArticleCardList'

export default {
  name: 'ViewPage',
  props: [],
  components: {
    ArticleCardList
  },
  data () {
    return {
      contentHidden: true,
      topButtonHidden: true,
      isOpen: false,
      menuOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'newPostID',
      'token'
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
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    },
    toggleMenu () {
      if (this.isOpen) {
        this.isOpen = !this.isOpen
      }
      this.menuOpen = !this.menuOpen
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
    createPost () {
      this.$store.dispatch('createPost')
    }
  },
  created () {
    NProgress.start()
  },
  mounted () {
    let that = this
    window.document.addEventListener(
      'scroll', function () {
        const scrollTop = window.document.documentElement.scrollTop ||
          window.document.body.scrollTop
        if (scrollTop > 100) {
          that.topButtonHidden = true
        } else {
          that.topButtonHidden = false
        }
      }
    )
    setTimeout(function () {
      NProgress.done()
      that.contentHidden = false
    }, 200)
  }
}
</script>

<style scoped>

</style>
