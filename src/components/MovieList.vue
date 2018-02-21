<template>
<div id="movie-list">
   <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
</div>
</template>

<script>
  import genres from '../util/genres';

  export default  {
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
  }

</script>
