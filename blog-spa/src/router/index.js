import Vue from 'vue'
import Router from 'vue-router'
import EditPage from '@/components/edit/EditPage.vue'
import LoginPage from '@/components/login/LoginPage.vue'
import PostPage from '@/components/post/PostPage.vue'
import RegisterPage from '@/components/register/RegisterPage.vue'
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
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/:userName',
      component: ViewPage,
      props: true
    },
    {
      path: '/:userName/:postID/edit',
      component: EditPage,
      props: true
    },
    {
      path: '/:userName/:postID',
      component: PostPage,
      props: true
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})
