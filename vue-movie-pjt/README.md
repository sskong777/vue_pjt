# PJT08



### 이번 pjt 를 통해 배운 내용

* Vue & Vue Router & Vuex
* AJAX통신
* Bootstrap과 css styling

---

#  요구사항

* 영화 정보를 제공하는 SPA 제작



---



## A. 컴포넌트 구조

![image-20220513202131564](/Users/seokhyeon/Library/Application Support/typora-user-images/image-20220513202131564.png)

---

## B. Router

* router/index.js

  ```js
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import HomeView from '../views/HomeView.vue'
  import RandomView from '@/views/RandomView'
  import WatchListView from '@/views/WatchListView'
  
  
  Vue.use(VueRouter)
  
  const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/random',
      name: 'random',
      component : RandomView
    },
    {
      path: '/watch-list',
      name: 'watch-list',
      component : WatchListView
    },
    
  ]
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router
  ```

  * Vue에서의 ModelView는 컴포넌트들의 구조인데 router와 vuex를 모두 사용하는 방법으로 프로젝트를 진행하였다.
  * router로 설정할 RandomView와 WatchListView 컴포넌트의 url를 지정하고 컴포넌트를 등록하였다.

  

## C. Views & Components

* HomeView.vue

  ```vue
  <template>
  <div class="container mt-4">
    <div class="home row row-cols-4 justify-content-center">
      <movie-card
      v-for="(movie,idx) in movies"
      :key="idx"
      :movie="movie"
      class="col m-3"
      ></movie-card>
    </div>
    </div>
  </template>
  
  <script>
  import MovieCard from '@/components/MovieCard.vue'
  
  export default {
    name: 'HomeView',
    components: {
      MovieCard,
    },
    computed:{
      movies(){
        return this.$store.state.movie_list
      }
    },
    methods:{
      movie_list(){
        this.$store.dispatch('loadHome')
      }
    },
    created(){
      this.movie_list()
    },
  }
  </script>
  ```

  * 먼저 HomeView에는 다수의 영화 정보가 들어가야한다. 우리 팀은 TMDB 사이트에서 popular 영화들을 불러오기로 정하고 AJAX통신으로 데이터를 가져왔다.
  * vuex로 movie_list 메서드를 통해 다수의 영화 정보들을 가져오기위해 dispatch함수를 호출해주었다.
  * 또한 HomeView페이지에서 페이지가 시작되었을때 영화의 정보들을 페이지에 나타내기 위해 `created()`함수를 작성하여 movie_list를 미리 가져오도록 하였다.
  * 가져온 다수의 데이터를 하위 컴포넌트인 MovieCard.vue에 넘겨주기 위해 v-for문과 props를 사용하여 각각 컴포넌트에 하나의 영화 정보를 넘겨주었다.

* index.js

  ```javascript
  mutations: {
    LOAD_HOME(state, data) {
  	state.movie_list = data
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
      
  ```

  * AJAX로 비동기 통신을 해야하므로 mutation보다 actions에 작성을 해주어야한다. mutation은 동기적 통신만 해야하기때문이다. 
  * TMDB에서 데이터를 가져오기 위해 url과api key를 통해 axios로 원하는 데이터들을 가져온다. 그 후 가져온 데이터를 commit을 통해 mutation에 넘겨준다. 
  * mutation으로 넘어간 데이터는 state에 있는 movie_list에 가져온 다수의 영화 목록들을 저장해준다.

  ![image-20220513214403538](/Users/seokhyeon/Library/Application Support/typora-user-images/image-20220513214403538.png)

---



* MovieCard.vue

  ```vue
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
  ```

  * 상위 컴포넌트인 MovieListView에서 각각의 영화 정보를 props를 통해 받아왔다.
  * movie라는 변수로 Object형태로 저장되어 있는 영화 정보를 부트스트랩을 이용하여 card형태로 작성하였다. 
  * 이때 이미지를 불러올 url은 computed로 미리 계산하여 img src에 바인딩을 통해 넣어주었다.

  

---

* RandomView.vue

  * script

    ```javascript
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
    ```

    * Random으로 영화 데이터 하나를 가져오기 위해 먼저 dispatch로 함수를 호출하였다.

    * index.js

      ```js
      actions:{
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
      }
      ```

      * 다수의 영화 정보들을 먼저 가져왔고 lodash를 통하여 sample함수로 영화 목록중 하나를 랜덤으로 선택하게 하였다. 그 뒤 mutation으로 데이터를 넘겨주어 최종적으로 데이터를 변경하게 해주었다.

    * 마지막으로 랜덤으로 선택된 영화 정보를 편하게 사용하기 위해 computed에 미리 state에 저장되어있는 랜덤 영화 정보를 가져와서 저장해주었다.

  * template

    ```html
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
    ```

    * RandomView의 button을 통해 dispatch로 랜덤 영화 정보를 가져오면 그 정보를 통해 card컴포넌트에 데이터를 담아주는 작업을 하였다.
    * button을 누를때마다 랜덤으로 영화의 데이터를 가져와서 html로 표현을 하였다.
    * 만약 데이터가 없다면 Pick a Movie라는 문구를 가져오기 위해 v-if / v-else문을 사용하였다.

  ![image-20220513214646798](/Users/seokhyeon/Library/Application Support/typora-user-images/image-20220513214646798.png)

---



* WatchListView.vue

  * script

    ```javascript
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
    ```

    * WatchList의 하위 컴포넌트들을 import하여 component에 먼저 등록해주었다.
    * WatchListForm에서 받아온 영화 제목을 받아오기 위해 computed로 movieItem을 받아왔다.

  * template

    ```html
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
    
    ```

    * 하위컴포넌트들을 불러온뒤 watchList에 저장된 영화 제목 목록들을 v-for로 WatchListItem에 props로 넘겨주어 작성해주었다

* WatchListForm.vue

  ```vue
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
  ```

  * input으로 작성된 값을 v-model로 data에 있는 movieTitle과 양방향연결을 해준 뒤 enter를 치거나 button을 눌렀을 떄 createMovie 메서드를 실행하기 위해 dispatch로 보내주었다.

  * index.js

    ```js
    mutations:{
      CREATE_MOVIE(state, movie) {
        state.movie_item.push(movie)
    	}
    }
    actions:{
        createMovie: function (context, movieItem) {
          context.commit('CREATE_MOVIE', movieItem)
        }
    }
    ```

    * dispatch로 호출된 createMovie action으로 commit하여 mutation으로 넘겨준뒤 state의 movieItem 값을 저장해준다. 배열 안에 넣어주어야하므로 Push를 사용해주었다.

* WatchListItem.vue

  ```js
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
  ```

  * WatchList에서 props로 영화 제목 하나 하나를 저장해와서 template에 출력해준다.

  

---





# 후기

* 처음으로 Front-end를 다루는 프로젝트였는데 생각보다 frontend도 까다로운 부분이 많았지만 vanila js으로만 작성한 것이 아닌 Vue프레임워크로 component별로 다루어 프로젝트를 진행한 것이 좀 더 편하였다.

  

* 이번 프로젝트에서도 ERD를 보며 테이블간의 관계를 파악하였는데 이번 Vue를 통한 프로젝트는 각 component의 구조를 먼저 파악하고 Vuex와 Vue Router, props,emit을 적절한 방법을 통해 component간의 데이터 이동을 하게 해주는것이 가장 중요한 작업이라고 생각하였고 가장 고민이 많았던 부분이다.



* 프로젝트 초반에 TMDM API를 통해 데이터를 가져오는 작업을 하였는데 오랜만에 AJAX 비동기 통신으로 데이터를 가져오는 작업이 까다로웠다. Vue에서 axios를 통해 데이터를 가져오는 연습을 충분히 해야할 것 같다고 느꼈다. 또한 가져온 데이터를 Vuex에서 actions와 mutations로 다루는 과정도 꽤 복잡하였는데 Vuex의 특성 상 비동기통신을 통한 데이터 작업은 actions에 해주고 actions

  에서 commit으로 mutations로 넘겨주는 과정이 복잡하였지만 꼭 필요한 작업이라고 생각하였다.

  

* 이번 프로젝트는 FrontEnd를 다루는 부분인 만큼 css에 좀 더 신경을 많이 썼는데 생각보다 styling을 하는작업이 오래 걸렸다. 오랜만에 bootstrap을 사용하여서 그런 이유도 있었다. 명세서에 나와있는대로 styling을 하는 작업이 문서를 찾아가면서 필요한 기능을 긁어오는 부분도 꽤 재밌고 확실히 보이는 부분이 원하는 대로 바뀌어서 성취감도 높았던 프로젝트였다. 



* FrontEnd만을 이용한 프로젝트였는데 FrontEnd에 대한 흥미도 많이 생겼고 곧 있을 최종 프로젝트에서 FrontEnd BackEnd 모두 다루어 진행을 할 것에 많이 대비가 되었다.  페어프로그래밍을 몇번 하다보니 페어와 역할 분담을 하는 것에 대한 중요성도 많이 느꼈고, 소통이 가장 중요한 영역이라는 것도 매우 많이 느낀 프로젝트였다. 
