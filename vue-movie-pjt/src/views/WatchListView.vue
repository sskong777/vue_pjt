<template>
<div class="d-flex justify-content-center mt-5">
  <ul class="list-group striped-list">
    <li class="list-group-item" id="todo">
          <h1>My Movie List</h1>
    <watch-list-form></watch-list-form>
    </li>
    <watch-list-item v-for="(movie, idx) in movieItem"
    :key="idx" :movie="movie"
    ></watch-list-item>
  </ul>
  </div>
</template>

<script>
import WatchListForm from '@/components/WatchListForm.vue'
import WatchListItem from '@/components/WatchListItem.vue'

export default {
    name : 'WatchListView',
    components:{
      WatchListForm,
      WatchListItem,
    },
    computed: {
      movieItem() {
        return this.$store.state.movie_item
      }
    }
}
</script>

<style>
#todo {
  background-color:rgba(185, 229, 247, 0.281);
  border-color: #cecece00;
}
ul.striped-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 80%;
    border-radius: 20px;
    /* max-width: 200px; */
}
ul.striped-list > li {
    border-bottom: 1px solid rgb(221,221,221);
    padding: 6px;
}
ul.striped-list > li:nth-of-type(odd) {
    background-color: #cecece8a ;
}
ul.striped-list > li:nth-of-type(even) {
    background-color:rgba(245, 222, 179, 0.267);
}
ul.striped-list > li:last-child {
    border-bottom: none;
}

</style>