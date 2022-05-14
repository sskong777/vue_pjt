<template>
  <li class="">
    {{ movie.title }}
    </li>
</template>

<script>
export default {
    name :"WatchListItem",

    props: {
      movie: Object,
    }
}
</script>

<style>

</style>