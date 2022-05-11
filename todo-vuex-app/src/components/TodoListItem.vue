<template>
  <div>
    <span @click='updateTodoStatus(todo)'>
      {{todo.title}}
    </span>
    
    <button @click="deleteTodo(todo)">[x]</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

//  { deleteTodo: function () {}, createTodo: function() {} }

export default {
  name: 'TodoListItem',
  props: {
    todo: Object,
  },
  methods: {
    ...mapActions(['createTodo', 'deleteTodo', 'updateTodoStatus']),
    myMethod() {

    }
  }
}
</script>

<style>

</style>
