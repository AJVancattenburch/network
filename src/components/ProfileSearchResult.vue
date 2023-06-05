<template>
  
<div class="ms-5">
  <form @submit.prevent="searchPosts()" class="ms-4">
      <input class="rounded-3" style="width: 85%;" type="text" v-model="search" placeholder="Search Posts..." />
      <button type="submit" class="btn btn-primary mx-3 p-1">Search</button>
  </form>
</div>

</template>

<script>

import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';

export default {
  setup() {
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
};
</script>

<style></style>