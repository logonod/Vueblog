<template>
<div>
  <header :class="{ 'fixed-header' : fixedHeader, 'header': true}">
    <div class="header-container">
      <a class="home-link" href="/">
        <div class="logo"></div>
        <span>{{post.author}}</span>
      </a>
      <ul class="right-list">
        <li class="list-item">
          <router-link to="/" class="item-link">
            文章
          </router-link>
        </li>
        <li class="list-item">
          <a href="#" class="item-link">发布</a>
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
    <h2 :class="{ 'hidden' : contentHidden}">{{post.title}}</h2>
    <p :class="{ 'hidden' : contentHidden,
    'post-date': true}">{{post.date}}</p>
    <div :class="{ 'hidden' : contentHidden, 'arrow-down': true}"
      @click="scrollToContent">
      <a href="javascript:;"></a>
    </div>
  </div>
  <main :class="{ 'hidden' : contentHidden,
  'app-body': true, 'flex-box': true}">
  <!-- Article START -->
  <article class="post-article">
    <section class="markdown-content" v-html='post.content'>
    </section>
    <div class="qrcode">
      <qriously id="share-qrcode" :value="url" :size="128" />
      <p class="notice">扫描二维码，分享此文章</p>
    </div>
    <div id="comments"></div>
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
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow.css'
import 'gitment/style/default.css'
import Gitment from 'gitment'
import { mapGetters } from 'vuex'
import {offset, findAncestor} from '@/lib/misc'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
var GeoPattern = require('geopattern')

export default {
  name: 'PostPage',
  props: ['postID'],
  computed: {
    ...mapGetters([
      'post'
    ])
  },
  data () {
    return {
      contentHidden: true,
      topButtonHidden: true,
      isOpen: false,
      fixedHeader: true,
      menuOpen: false,
      geoPattern: '',
      url: window.document.location.href,
      imageSrc: '',
      imageWidth: '',
      transY: '',
      zoom: '1',
      wrapAtive: false,
      rendered: false
    }
  },
  methods: {
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
      this.$store.dispatch('getPost', {post})
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
    const body = window.document.documentElement ||
      window.document.body
    this.$el.querySelector('.markdown-content').addEventListener(
      'click', function (event) {
        if (event.target.classList.contains('headerlink')) {
          event.preventDefault()
          const targetY = offset(event.target).top - 65
          if (targetY > 0) {
            let currentY = body.scrollTop
            const step = parseInt(targetY - currentY) / 30
            if (step > 0) {
              setTimeout(function animate () {
                currentY += step
                body.scrollTop = currentY
                if (currentY < targetY - step) {
                  setTimeout(animate, 16)
                }
              }, 16)
            }
          }
        } else if (event.target.tagName === 'IMG') {
          that.imageSrc = event.target.getAttribute('src')
          const imageW = event.target.clientWidth
          const imageH = event.target.clientHeight
          let zoom = (window.innerWidth * 0.95 / imageW).toFixed(2)
          zoom = zoom < 1 ? 1 : zoom
          zoom = zoom > 2 ? 2 : zoom
          const transY = ((window.innerHeight - imageH) / 2).toFixed(2)
          that.imageWidth = imageW
          that.zoom = zoom
          that.transY = transY
          that.wrapAtive = true
          window.document.documentElement.style.overflow = 'hidden'
        }
      }
    )
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
        let images = window.document.querySelectorAll('.markdown-content img')
        images.forEach(function (imageNode) {
          imageNode.onerror = function () {
            this.src = '/static/images/error-img.png'
          }
        })
        setTimeout(function () {
          NProgress.done()
          that.contentHidden = false
        }, 200)
        const pattern = GeoPattern.generate(this.post.url)
        this.geoPattern = pattern.toDataUrl()
        // highlight.js
        const blocks = window.document.querySelectorAll('figure pre')
        blocks.forEach((block) => {
          const figure = findAncestor(block, 'figure')
          const lang = figure.className.split(' ')[1] || 'code'
          const codeHtml = block.innerHTML
          const codeTag = window.document.createElement('code')
          codeTag.className = lang
          codeTag.innerHTML = codeHtml
          block.innerHTML = codeTag.outerHTML
          figure.setAttribute('data-lang', lang.toUpperCase())
          const code = block.querySelector('code')
          console.log(code)
          hljs.highlightBlock(code)
        })
        const gitment = new Gitment({
          owner: 'logonod',
          repo: 'blogComment',
          oauth: {
            client_id: '37462ee2e3af292607e2',
            client_secret: 'c377981ba1809579bd9a073fc8ace43865331096'
          }
        })
        gitment.render('comments')
      }
    })
  }
}
</script>

<style scoped>

</style>
