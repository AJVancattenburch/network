<template>
  
<div class="col-8">
  <form class="d-flex" @submit.prevent="searchPosts()">
    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="search" />
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
</div>

</template>

<script>

import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter()
      const search = ref('')
      return {
          search,

          async searchPosts() {
              try {
                  const searchTerm = search.value
                  logger.log('searching for posts that contain', searchTerm)
                  await postsService.searchPosts(searchTerm)
                  router.push({name: 'Search'})
              } catch (error) {
                  logger.error(error)
                  Pop.toast(error.message, 'error')
              }
          }
      };
  },
};
</script>

<style></style>