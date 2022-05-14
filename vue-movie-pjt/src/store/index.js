import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'


Vue.use(Vuex)

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = '9fd49ab00d660f7801565ddb3d5db886'
const api = axios.create({ baseURL: API_URL })

export default new Vuex.Store({
  state: {
    movie_list: [],
    pick_movie : '',
    movie_item: []
  },
  getters: {
  },
  mutations: {
    LOAD_HOME(state, data) {
      state.movie_list = data
    },
    RANDOM_PICK(state,pick){
      state.pick_movie = pick
    },
    CREATE_MOVIE(state, movie) {
      state.movie_item.push(movie)
    }
  },
  actions: {
    loadHome: function (context) {
      api.get(
        'movie/popular', {
        params: {
          api_key: API_KEY,
        }
      })
        .then(res => {
          // console.log(res)
          context.commit('LOAD_HOME', res.data.results)
        })
    },
    RandomPick: function(context){
            api.get(
        'movie/popular', {
        params: {
          api_key: API_KEY,
        }
      })
        .then(res => {
          // console.log(res)
          context.commit('RANDOM_PICK',_.sample(res.data.results))
        })
      

    },
    createMovie: function (context, movieItem) {
      context.commit('CREATE_MOVIE', movieItem)
    }
  },
  modules: {
  }
})
