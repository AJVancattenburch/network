<template>

  <div class="container-fluid bg-dark">

    <section class="row justify-content-center pt-5">
      <div class="col-8">
        <ProfileSearchResult />
      </div>
    </section>
    
    
    
    <createPost :profile="account" />
    <section>
      <div class="d-flex">
        <div class="p-4 ms-4 pe-1 text-center col-6 mt-5">
          <button :disabled="!previousUrl" @click="changePage(previousUrl)" class="btn btn-light mt-5">Previous Page</button>
        </div>
        <div class="p-4 ms-4 pe-1 text-center col-5 mt-5">
          <button :disabled="!nextUrl" @click="changePage(nextUrl)" class="btn btn-light me-5 mt-5">Next Page</button>
        </div>
      </div>
      <div class="row">
        <div class="col-10 blog-list  ms-5 text-dark" v-for="(p, index) in posts" :key="index">
          <h3 class="text-center mb-5"></h3>
          <PostCard :post="p" />
        </div>
      </div>

    </section>

    
  </div>

        <!-- <div v-for="p in posts" :key="p.id">

          <PostCard :post="p" />

        </div> -->

  
  <!-- <section class="container-fluid"> 
    <div class="row text-center mb-4"> 
      <div class="col-6"> 
        <button class="btn btn-info" @click="changePage(previousPage)" :disabled="!previousPage">Previous</button> 
      </div> 
      <div class="col-6"> 
        <button class="btn btn-info px-4" @click="changePage(nextPage)" :disabled="!nextPage">Next</button> 
      </div> 
    </div> 
  </section> -->

</template>

<script>
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from "vue";
import ProfileSearchResult from "../components/ProfileSearchResult.vue";

export default {
  components: {
    // PostCard,
    ProfileSearchResult,
    // CreatePost
  },
  
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch ( error ) {
        logger.error( error )
        Pop.toast( '[GETTING ALL POSTS...]', error )
      }
    }

    onMounted(() => {
      getPosts()
    })
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      nextUrl: computed(() => AppState.newer),
      previousUrl: computed(() => AppState.older),


      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.error(error)
          Pop.toast('[CHANGE PAGE ERROR]', error)
        }
      }

    }

  }
}

</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  
  .post-card {
    width: 50vw;
    max-height: 200px;

    img {
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>