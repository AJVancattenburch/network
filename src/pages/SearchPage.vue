<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-3">
      <ProfileSearchResult />
      </div>
    </div>
  </div>
  <section class="container">
    <div class="row">
      <div class="col-8 offset-2 my-4" v-for="p in searchPosts" :key="p.id">
        <PostCard :post="p"/>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row text-center mb-4">
      <div class="col-6">
        <button class="btn btn-info" @click="changePage(previousPage)" :disabled="!previousPage">Previous</button>
      </div>
      <div class="col-6">
        <button class="btn btn-info px-4" @click="changePage(nextPage)" :disabled="!nextPage">Next</button>
      </div>
    </div>

  </section>
</template>

<script>
import { computed, ref } from '@vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { ProfileSearchResult } from "../models/ProfileSearchResult.js";

export default {
    setup() {
        let query = ref("");
        return {
            query,
            search: computed(() => AppState.searchPosts),
            async searchPosts() {
                try {
                    await postsService.searchPosts(query.value);
                }
                catch (error) {
                    logger.error("[Getting Posts By Search]", error);
                    Pop.error(error);
                }
            }
        };
    },
    components: { ProfileSearchResult },
};
</script>

<style>

</style>