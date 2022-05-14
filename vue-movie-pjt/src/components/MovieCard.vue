<template>

    
  <div class="card" style="width: 18rem;">
    <img :src="posterUrl" class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="fw-bold">{{ movie.title }}</h3>
      <p class="card-text">{{ movie.overview }}</p>
    </div>
  </div>

</template>

<script>
export default {
    name : "MovieCard",
    props:{
      movie:Object,
    },
    computed: {
      posterUrl () {
        return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      }
    }
}
</script>

<style>

</style>