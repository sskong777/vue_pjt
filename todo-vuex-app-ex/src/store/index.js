import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[
    ]
  },
  getters: {
    completedTodos(state){
      return state.todos.filter(todo=>{
        return todo.isCompleted
      }).length
    },
    unCompletedTodos(state){
      return state.todos.filter(todo=>{
        return !todo.isCompleted
      }).length
    },
    
  },
  mutations: {
    CREATE_TODO(state,newTodo){
      state.todos.push(newTodo)
    },
    DELETE_TODO(state, todoItem){
      const index = state.todos.indexOf(todoItem)
      state.todos.splice(index,1)
    },
    UPDATE_TODO_STATUS(state, todoItem){
      state.todos = state.todos.map(todo =>{
        if(todo === todoItem){
          todo.isCompleted = !todo.isCompleted    
        }
        return todo
      }
      )
    }
  },
  actions: {
    createTodo({ commit }, newTodo){
      commit('CREATE_TODO', newTodo)
    },
    deleteTodo({ commit }, todoItem){
      if (confirm('정말 삭제하시겠습니까?')){
        commit("DELETE_TODO", todoItem)
      }
    },
    updateTodoStatus({commit}, todoItem){
      commit("UPDATE_TODO_STATUS", todoItem)
    }

  },
  modules: {
  }
})
