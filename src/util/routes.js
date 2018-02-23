import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
  { path: '/', name: 'home', component: Overview },
  { path: '/movie/:id', name: 'movie',  component: Detail },
  { path: '*', redirect: { name: 'home' } }
]
