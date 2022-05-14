<template>
  <div id="app">
    <h1>My Todos</h1>
    <h2>끝난거 : {{ $store.getters.completedTodos }}</h2>
    <h2>남은거 : {{ $store.getters.unCompletedTodos }}</h2>
    <todo-list></todo-list>
    <todo-form></todo-form>
  </div>
</template>

<script>

import TodoList from '@/components/TodoList.vue'
import TodoForm from '@/components/TodoForm.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    TodoForm,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
