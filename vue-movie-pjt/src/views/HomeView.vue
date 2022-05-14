<template>
<div class="container mt-4">
  <div class="home row row-cols-4 justify-content-center">
    <movie-card
    v-for="(movie,idx) in movies"
    :key="idx"
    :movie="movie"
    class="col m-3"
    ></movie-card>
  </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'HomeView',
  components: {
    MovieCard,
  },
  computed:{
    movies(){
      return this.$store.state.movie_list
    }
  },
  methods:{
    movie_list(){
      this.$store.dispatch('loadHome')
    }
  },
  created(){
    this.movie_list()
  },
}
</script>
