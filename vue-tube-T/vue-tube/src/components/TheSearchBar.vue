<template>
  <!-- 
    class 를 두 개로 나누어서 하나는 정상 class 설정, 
    나머지 하나는 v-bind 처리 할 수 있다. 
    class의 margin-zero와 margin-30h 는 번갈아 가면서 적용된다.
  -->
  <div class="search-bar d-flex justify-content-center" 
    :class="{ 'margin-zero': isSearched, 'margin-30h': !isSearched }"> 

    <input type="text" @keydown.enter="sendData" class="search-bar-input">
    <button @click="sendData" class="btn btn-primary">검색</button>
  </div>
</template>

<script>
export default {
  name: 'TheSearchBar',
  methods: {
    sendData(event) {
      this.$emit('send-keyword', event.target.value)
    }
  },
  props: {
    isSearched: Boolean,
  }
}
</script>

<style>
.search-bar {
  width: 100%;
  font-size: 1rem;
  padding: 0.3rem;
  transition: margin 0.5s;  /* 마진 값이 변할 때 0.5초동안 부드럽게 변하도록 설정 */
}

.search-bar-input {
  width: 90%;
  padding: 0.3rem;
}

.margin-30h {
  margin-top: 30vh;
}

.margin-zero {
  margin-top: 0;
}
</style>