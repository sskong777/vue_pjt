<template>
  <div>
    <input type="text"
    v-model.trim="movieTitle"
    @keyup.enter="createMovie"
    >
    <button class="btn btn-secondary" @click="createMovie">Add</button>
  </div>
</template>

<script>
export default {
    name : "WatchListForm",
    data: function() {
      return {
        movieTitle:''
      }
    },
    methods: {
      createMovie: function () {
        const movieItem = {
          title: this.movieTitle,
        }
        if (movieItem.title) {
          this.$store.dispatch('createMovie', movieItem)
        }
        this.movieTitle=''
      }
    }
}
</script>

<style>

</style>