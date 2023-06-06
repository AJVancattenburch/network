<template>

  <nav class="navbar navbar-expand-text-center lg navbar-dark bg-dark px-3 pb-5" style="height: 75px;">
    <router-link class="col-1 navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center mx-5">
        <img alt="logo" class="me-5" src="https://i.ibb.co/4YnzxyH/Logo.png" height="45" />
      </div>
    </router-link>

    <ProfileSearchResult />

    <router-link :to="{ name: 'Account' }" role="button" class="col-1 text-success text-uppercase ms-5">
      <i class="mdi mdi-account fs-1 mb-3"></i>
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
import ProfileSearchResult from '../components/ProfileSearchResult.vue';

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

import Login from './Login.vue';
import ProfileSearchResult from './ProfileSearchResult.vue';
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import { Route } from "vue-router";
import { ref } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { computed } from "vue";

export default {
  setup() {
    const posts = computed(() => AppState.posts)
    const search = ref('')
      return {
          search,

          async searchPosts() {
              try {
                  const searchTerm = search.value
                  logger.log('searching for posts that contain', searchTerm)
                  await postsService.searchPosts(searchTerm)
              } catch (error) {
                  logger.error(error)
                  Pop.toast(error.message, 'error')
              }
            }
          };
        },

        components: { Login, ProfileSearchResult },
};
