import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

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
      // console.log("PAYLOAD ", category,title,checked);
    }
  },
  components: {
    'movie-list': {
      template: `<div id="movie-list">
                   <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
                 </div>`,
      data() {
        return {
          movies: [
            { title: 'Pulp Fiction', genre:genres.CRIME },
            { title: 'Home Alone', genre:genres.COMEDY },
            { title: 'Quantum Of Solice', genre:genres.DRAMA },
            { title: 'Taken II', genre:genres.CRIME },
            { title: 'Austin Powers', genre:genres.COMEDY }
          ]
        }
      },
      props: [ 'genre', 'time' ],
      methods: {
        moviePassesGenreFilter(movie) {
          if (this.genre.length) {
            return this.genre.find(genre => movie.genre == genre);
          } else {
            return true;
          }
        }
      },
      computed: {
        filteredMovies() {
          return this.movies.filter(this.moviePassesGenreFilter);
        }
      }
    },
    'movie-filter': {
      data() {
        return {
          genres
        }
      },
      template: `<div id="movie-filter">
                   <h2>Filter results</h2>
                   <div class="filter-group">
                     <check-filter
                        v-for="genre in genres" v-bind:title="genre"
                        v-on:check-filter="checkFilter">
                     </check-filter>
                   </div>
                 </div>`,
      methods: {
        checkFilter(category,title,checked) {
          this.$emit('check-filter',category,title,checked);
        }
      },
      components: {
        'check-filter': {
          data() {
            return {
              checked: false
            }
          },
          props: ['title'],
          template: `<div v-bind:class="{ 'check-filter':true, active: checked }"
                      @click="checkFilter">
                      <span class="checkbox"></span>
                      <span class="check-filter-title">{{ title }}</span>
                    </div>`,
          methods: {
            checkFilter() {
              this.checked = !this.checked;
              this.$emit('check-filter','genre',this.title,this.checked);
            }
          }
        }
      }
    }
  }
})
