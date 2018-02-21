import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: []
  },
  methods: {
    checkFilter(category,title,checked) {
      if (checked) {
        this[category].push(title);
      } else {
        let i = this[category].indexOf(title);
        if (i > -1) {
          this[category].splice(i,1);
        }
      }
    }
  },
  components: {
    MovieList,
    MovieFilter
  }
})
