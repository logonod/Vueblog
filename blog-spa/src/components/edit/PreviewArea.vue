<template>
<div>
  <section class="markdown-content" v-html='editPost.content'>
  </section>
  <div class="image-view-wrap" :class="{ 'wrap-active': wrapAtive,
    'image-view-wrap': true }" v-if="wrapAtive" @click="closeImageView" >
    <div class="image-view-inner">
      <img :src="imageSrc" :width="imageWidth"
        :style="{ transform: `translate3d(0, ${this.transY}px, 0) scale3d(${ this.zoom }, ${ this.zoom }, 1)` }" />'
    </div>
  </div>
</div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow.css'
import { mapGetters } from 'vuex'
import {offset, findAncestor} from '@/lib/misc'

export default {
  name: 'PreviewArea',
  data () {
    return {
      imageSrc: '',
      imageWidth: '',
      transY: '',
      zoom: '1',
      wrapAtive: false
    }
  },
  computed: {
    ...mapGetters([
      'editPost'
    ])
  },
  methods: {
    closeImageView () {
      this.wrapAtive = false
      window.document.documentElement.removeAttribute('style')
    }
  },
  mounted: function () {
    let that = this
    const body = window.document.documentElement ||
      window.document.body
    window.document.querySelector('.markdown-content').addEventListener(
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
      hljs.highlightBlock(code)
    })
    let images = window.document.querySelectorAll('.markdown-content img')
    images.forEach(function (imageNode) {
      imageNode.onerror = function () {
        this.src = '/static/images/error-img.png'
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "~bulma/bulma";
</style>
