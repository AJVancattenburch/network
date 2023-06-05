<template>

  <nav class="navbar navbar-expand-text-center lg navbar-dark bg-dark px-3 pb-5 me-5">
    <router-link class="col-1 navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center col-12 mx-5">
        <img alt="logo" src="https://i.ibb.co/4YnzxyH/Logo.png" height="45" />
      </div>
    </router-link>
    <router-link :to="{ name: 'Search' }" role="button" class="col-7 searchbar">
      <ProfileSearchResult />
    </router-link>
    <router-link :to="{ name: 'Account' }" role="button" class="col-1 text-success text-uppercase">
      <i class="mdi mdi-account fs-3 mb-3"></i>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <div class="navbar-nav">
        
        <Login />
      </div>
      <!-- LOGIN COMPONENT HERE -->
      <div class="col-4"></div>
    </div>
  </nav>

</template>


<script>

import Login from './Login.vue';
import ProfileSearchResult from './ProfileSearchResult.vue';

export default {
  setup() {
    return {}
  },
  components: { Login, ProfileSearchResult }
}

</script>


<style scoped lang="scss">
.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
