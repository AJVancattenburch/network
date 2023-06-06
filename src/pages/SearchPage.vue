<template>
  <!-- NOTE .prevent is the same as saying 'window.event.preventDefault()' -->
  <!-- <form @submit.prevent="searchPosts()">
      <input class="w-100" type="text" v-model="search" placeholder="Search..." />
  </form> -->

  <div class="row">
    <div class="col-10 blog-list  ms-5 text-dark" v-for="(p, index) in posts" :key="index">
      <h3 class="text-center mb-5"></h3>
      <PostCard :post="p" />
    </div>
  </div>
  

    <!-- NOTE '{{}}' is like string interpolation-->
    <!-- <h1>{{ post?.body }}</h1>
</div> -->
<div> Search page!!! </div>
</template>

<script>

// import ProfileSearchResult from "../components/ProfileSearchResult.vue";
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {

  setup() {
      return {
        posts: computed(() => AppState.searchPosts)
      };
  },
};

</script>

<style></style>



<style></style>