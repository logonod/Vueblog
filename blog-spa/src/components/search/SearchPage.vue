<template>
<div>
  <header class="fixed-header header">
    <div class="header-container">
      <a class="home-link" href="/">
        <div class="logo"></div>
        <span>刘泽宇</span>
      </a>
      <ul class="right-list">
        <span class="search-wrap">
          <input placeholder="全文搜索" type="text" class="search"
            v-model="searchContent" @keyup.enter="searchAction">
          <i class="icon-search"></i>
        </span>
        <li class="list-item">
          <router-link to="/" class="item-link">
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
            <router-link to="/" class="menu-link">
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
    <ResultCardList />
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
import ResultCardList from './ResultCardList'

export default {
  name: 'SearchPage',
  props: [],
  components: {
    ResultCardList
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
      'token',
      'searchKeyword'
    ]),
    logined () {
      const token = localStorage.getItem('token')
      if (token) {
        return true
      } else {
        return false
      }
    },
    searchContent: {
      get () {
        return this.searchKeyword
      },
      set (value) {
        this.$store.commit('UPDATE_SEARCH_KEYWORD', {keyword: value})
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
    },
    searchAction () {
      if (this.searchKeyword.trim() === '') {
        this.$router.push({ path: '/' })
      } else {
        this.$store.dispatch('getSearchResults', {keyword: this.searchKeyword})
      }
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
.search {
  width: 100px;
  height: 24px;
  margin: 10px 0;
  padding: 1px 10px 1px 26px;
  border: 1px solid #000;
  border-radius: 13px;
  background: none;
}
.search:focus {
  outline: none;
}
.search-wrap {
  position: relative;
  margin-right: 20px;
}
.icon-search {
  position: absolute;
  width: 14px;
  height: 14px;
  left: 10px;
  top: 50%;
  margin-top: -6px;
  background: url(/static/images/icon-search.png) no-repeat;
  background-size: contain;
}
</style>
