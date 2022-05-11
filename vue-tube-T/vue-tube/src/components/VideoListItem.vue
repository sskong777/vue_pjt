<template>
  <div class="item" @click="choiceVideo">
    <!-- 길이가 길어서 computed 로 줄임 -->
    <img :src="imgSrc" alt="thumbnail" class="thumbnail-img"> 
    <!-- filters 는 |(파이프) 앞의 데이터를 filter 메서드의 인자로 넘김 -->
    <!-- filters에 정의된 메서드가 실행된 후 리턴되는 값을 사용 -->
    <span>{{ video.snippet.title | unescape }}</span>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'VideoListItem',
  props: {
    video: Object,
  },
  methods: {
    // 선택된 비디오 정보를 전달하기 위한 부분
    choiceVideo() {
      this.$emit('send-data', this.video)
    }
  }, 
  computed: {
    imgSrc () {
      return this.video.snippet.thumbnails.default.url
    }
  },
  // 문자열 중에서 깨진 문자들을 escape 문자라고 함
  // 특수문자들 같은 경우 ascii 문자로 모든 문자로 표현하려다 보니 글자 깨짐이 발생
  // unescape으로 ascii 변환 전으로 되돌리기 위해 사용
  filters: {
    // escape 문자를 제대로 표현하기 위함
    unescape(str) {
      return _.unescape(str)  // lodash의 unescape 메서드 사용
    }
  }
}
</script>

<style>
.item {
  display: flex;        /* 가로배치 및 flex의 CSS 적용을 위함 */
  margin-bottom: 1rem;  /* 아이템들의 상하 여백 */
  cursor: pointer;      /* 마우스를 포인터로 변경 */
  overflow: hidden;
  text-overflow: ellipsis;
}

.thumbnail-img {
  height: fit-content;   /* 텍스트가 길어져도 이미지는 늘어나지 않게 설정 */
  margin-right: 0.5rem;  /* 이미지와 텍스트 사이의 여백 */
}
</style>