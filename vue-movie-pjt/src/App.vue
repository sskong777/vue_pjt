<template>

  <div id="app" class="mb-5">

      <nav class="navbar navbar-expand-lg navbar-light sticky-top">
        <div class="container-fluid d-flex justify-content-between">
          <a class="navbar-brand" href="#">SSAFY</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <div class="navbar-toggler-icon"></div>
          </button>
          <div class="collapse navbar-collapse flex-grow-0" id="navbarNav">
            <ul class="navbar-nav">
              <li class="me-3">
                <router-link to="/">Home</router-link>
              </li>
              <li class="me-3">
              <router-link to="/random">Random</router-link>
              </li>
              <li class="me-2">
              <router-link to="/watch-list">MyMovieList</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view />
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
    background-color:rgba(185, 229, 247, 0.281);
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration-line: none;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>