<template>
  <div id="overview">
    <day-select v-bind:selected="day"></day-select>
    <div class="main">
      <movie-list v-bind:genre="genre"
                  v-bind:time="time"
                  v-bind:day="day"
                  v-bind:movies="movies">
      </movie-list>
      <movie-filter></movie-filter>
    </div>
  </div>
</template>

<script>

  import MovieList from './MovieList.vue';
  import MovieFilter from './MovieFilter.vue';
  import DaySelect from './DaySelect.vue';

  export default  {
    props: [ 'genre', 'movies', 'day', 'time', ],
    components: {
      MovieList,
      MovieFilter,
      DaySelect
    },

  }
</script>
