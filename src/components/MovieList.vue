<template>
<div id="movie-list">
  <div v-if="filteredMovies.length">
    <movie-item v-for="movie in filteredMovies" class="movie"
                v-bind:movie="movie.movie">
      <div class="movie-sessions">
        <div v-for="session in filteredSessions(movie.sessions)" class="session-time-wrapper">
          <div class="session-time">{{ formatSessionTime(session.time) }}</div>
        </div>
      </div>
    </movie-item>
  </div>
  <div v-else-if="movies.length" class="no-results">
    {{ noResultsFor }}
  </div>
  <div v-else class="no-results">
    Loading ...
  </div>

</div>
</template>

<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import MovieItem from './MovieItem.vue';

  export default  {
    props: [ 'genre', 'movies', 'day', 'time', ],
    methods: {
      formatSessionTime(rawTime) {
        return this.$moment(rawTime).format('h:mm: A');
      },
      filteredSessions(sessions) {
        return sessions.filter(this.sessionPassesTimeFilter);
      },
      moviePassesGenreFilter(movie) {
        if (!this.genre.length) {
          return true;
        } else {
          // return this.genre.find(genre => movie.genre == genre);
          let movieGenres = movie.movie.Genre.split(", ");
          let matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });
          return matched;
        }
      },
      sessionPassesTimeFilter(session) {
        if (!this.day.isSame(this.$moment(session.time),'day')) {
          return false;
        } else if (this.time.length === 0 || this.time.length === 2 ) {
          return true;
        } else if (this.time[0] === times.AFTER_6PM ) {
          return this.$moment(session.time).hour() >= 18;
        } else {
          return this.$moment(session.time).hour() < 18;
        }
      }
    },
    computed: {
      filteredMovies() {
        return this.movies
                .filter(this.moviePassesGenreFilter)
                .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
      },
      noResultsFor() {
        let timesList = this.time.join(', ');
        let genresList = this.genre.join(', ');
        return `No results for ${timesList}${ timesList.length && genresList.length ? ', ':''}${genresList}`;
      }
    },
    components: {
      MovieItem
    }
  }

</script>
