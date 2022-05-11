<template>
  <div id="app">
    <header>
      <!-- <img class="vue-logo" alt="Vue logo" src="./assets/logo.png"> -->
      <the-search-bar 
        @send-keyword="searchVideo"
        :is-searched="isSearched"
        ></the-search-bar>
    </header>

    <section class="d-flex">
      <!-- 비디오가 재생되는 자식 컴포넌트 -->
      <video-detail :selected-video="selectedVideo"></video-detail>

      <!-- 검색된 비디오 리스트가 보여질 자식 컴포넌트 -->
      <!-- videos : 검색 리스트들을 props로 전달하기 위함 -->
      <!-- send-data - 선택된 비디오 데이터를 받기 위함 (emit 된 비디오 데이터)  -->
      <video-list 
        :videos="videos"
        @send-data="getVideo"
      ></video-list>

    </section>
  </div>
</template>

<script>
import axios from 'axios'
import TheSearchBar from "@/components/TheSearchBar"
import VideoList from '@/components/VideoList'
import VideoDetail from '@/components/VideoDetail'

export default {
  name: 'App',
  components: {
    TheSearchBar,
    VideoList,
    VideoDetail,
  },
  data() {
    return {
      videos: [],  // 검색된 video 리스트를 저장하는 변수
      // 선택된 비디오를 저장하는 변수 (detail 컴포넌트에 props 됨)
      selectedVideo: null,   // 선택된 값이 없을 때는 null 설정 (null 은 Object type 이기 때문에)
    }
  },
  methods: {
    // 키워드를 받아서 Youtube API 에 요청하는 부분
    searchVideo(keyword) {
      const API_URL = 'https://www.googleapis.com/youtube/v3/search'
      // 발급받은 API KEY 는 노출을 되도록이면 피해야함
      /*
        API KEY 를 숨기는 방법
        1. .env.local 파일을 package.json 과 같은 위치에 생성한다. (파일명은 . 으로 시작)
        2. .env.local 파일에 VUE_APP_  로 시작하는 변수를 만들어 API 키를 넣어준다.
           (예시: VUE_APP_YOUTUBE_API_KEY=AIzaSyDlx... (APIKEY값) - 이 때 API키는 따옴표 없이 추가)
        3. (중요) 서버를 중지했다가 다시 실행 시킨다!! (.env.local 파일을 서버 실행시 로드해야 하기 때문)
        4. process.env.VUE_API_YOUTUBE_API_KEY 로 값을 가져올 수 있다.
        5. 이 부분 궁금하면 질문주세요.
           참고 링크
           https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
      */
      const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY

      // YOUTUB API 요청
      axios({
        method: 'get',
        url: API_URL,
        params: {
          part: 'snippet',   // 필수 파라미터
          key: API_KEY,      // API KEY
          q: keyword,        // 검색어
          type: 'video',     // 찾는 타입
        }
      })
        .then(res => {
          // console.log(res.data)        // Youtube 응답이 담겨져 있음 (json)
          this.videos = res.data.items  // items 에 검색 결과 list가 있음
        })
    },

    // VideoListItem 으로 부터 받은 데이터 (즉, 선택된 비디오 데이터)
    getVideo(data) {
      this.selectedVideo = data    // VideoDetail 로 props 해주기 위해 변수에 저장
    }
  },
  computed: {
    // 검색 결과가 있는지 확인.
    isSearched() {
      return this.videos.length != 0
    }
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

section,
header {
  width: 80%;         /* 좌우 너비를 전체 뷰포트에서 80% */
  margin: 0 auto;     
  padding: 1rem 0;
}
</style>
