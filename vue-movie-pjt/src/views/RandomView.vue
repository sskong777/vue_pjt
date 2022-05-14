<template>
<div class="d-flex justify-content-center">
  <div class="mt-3">
    <div class="d-grid">
    <button @click="RandomPick" class="btn btn-success">PICK</button>
    </div>
    <br>
    <div class="card" style="width: 18rem;" v-if="pickMovie">
    <img :src="posterUrl" class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="fw-bold">{{ pickMovie.title }}</h3>
      <p class="card-text">{{ pickMovie.overview }}</p>
    </div>
  </div>
  <div v-else>
        <div class="card border-white" style="width: 18rem;">
    <div class="card-body">
      <h3 class="text-secondary text-opacity-50">Pick a MOVIE</h3>
    </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
    name : "RandomView",
    methods:{
      RandomPick: function(){
        this.$store.dispatch('RandomPick')

      }
    },
    computed:{
      pickMovie(){
        return this.$store.state.pick_movie
      },
      posterUrl () {
        return `https://image.tmdb.org/t/p/original/${this.pickMovie.poster_path}`
      }
    }
    
}
</script>

<style>
</style>