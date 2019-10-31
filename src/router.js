import Vue from 'vue';
import VueRouter from 'vue-router';

const Subreddit = () => import(/* webpackChunkName: "subreddit" */ "./views/Subreddit");
const Search = () => import(/* webpackChunkName: "search" */ "./views/Search");
const SearchSub = () => import(/* webpackChunkName: "search" */ "./views/SearchSub");
const Post = () => import(/* webpackChunkName: "post" */ "./views/Post");

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/r/:subreddit/search/:searchString',
      name: 'searchsub',
      component: SearchSub
    },
    {
      path: '/search/:searchString',
      name: 'search',
      component: Search
    },
    {
      path: '/r/:subreddit/:sort',
      name: 'subreddit',
      component: Subreddit
    },
    {
      path: '/r/:subreddit/comments/:postid/:postlink',
      name: 'post',
      component: Post
    }
  ]
});
