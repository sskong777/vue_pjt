import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  // data
    todos: [],
  },
  getters: {  // computed
  },
  mutations: {  // methods => change
    CREATE_TODO(state, newTodo) {
      state.todos.push(newTodo)
    },
    DELETE_TODO(state, todoItem) {
      const index = state.todos.indexOf(todoItem)
      state.todos.splice(index, 1)
    },
    UPDATE_TODO_STATUS(state, todoItem){
      state.todos.map(todo=>{
        todo.isCompleted = !todo.isCompleted
        return todo
        })
      todoItem.isCompleted = !todoItem.isCompleted
    }
  },
  
  actions: {  // methods => !change
    createTodo({ commit }, newTodo) {
      // context => 맥가이버 칼
      commit('CREATE_TODO', newTodo)
    },
    deleteTodo({ commit }, todoItem) {
      commit('DELETE_TODO', todoItem)
    },
    updateTodoStatus({ commit }, todoItem){
      commit("UPDATE_TODO_STATUS", todoItem)
    }
  },
})
