<template>
  <div class="video-list" 
    :class="{ 'list-100': !isChoose }">
    <!-- 
      검색 결과로 찾은 비디오의 개수만큼 반복 
      key 값이 필수 (key 값으로 idx 정보를 사용하면 됨) 
      props 를 위해서 video 라는 이름으로 값을 내림 
    -->
    <video-list-item 
      v-for="(video, idx) in videos" 
      :key="idx"
      :video="video"
      @send-data="getVideo"
    ></video-list-item>
  </div>
</template>

<script>
import VideoListItem from '@/components/VideoListItem'

export default {
  name: 'VideoList',
  components: {
    VideoListItem
  },
  data() {
    return {
      isChoose: false,
    }
  },
  props: {
    videos: Array,
  },
  methods: {
    getVideo(data) {
      this.$emit('send-data', data)
      this.isChoose = true
    }
  }
}
</script>

<style>
.video-list {
  padding: 0;
  margin: 0;
  width: 30%;
  transition: width 0.25s;    /* 너비가 변할 때 바로 변하는 것이 아닌 0.25초 동안 변하게 함 */
}

/* 
  해당 class 가 정의되어 있으면 너비가 좌우 100%를 가짐
  해당 class 가 없어지게 되면 위에 설정된 width: 30% 로 변함
  이 때 transition 을 통해 부드럽게 전환되도록 설정
 */
.list-100 {
  width: 100%;
}
</style>