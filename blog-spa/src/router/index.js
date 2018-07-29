import Vue from 'vue'
import Router from 'vue-router'
import EditPage from '@/components/edit/EditPage.vue'
import LoginPage from '@/components/login/LoginPage.vue'
import PostPage from '@/components/post/PostPage.vue'
import ViewPage from '@/components/view/ViewPage.vue'
import NotFoundPage from '@/components/NotFoundPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/',
      component: ViewPage
    },
    {
      path: '/:postID/edit',
      component: EditPage,
      props: true
    },
    {
      path: '/:postID',
      component: PostPage,
      props: true
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})
