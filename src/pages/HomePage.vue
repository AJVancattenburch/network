<template>

  <div class="container-fluid">

    <createPost :profile="account" />
    
    <section>
      <div class="row">
          <div class="col-10 blog-list  ms-5 text-dark" v-for="p in posts" :key="p.id">
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


export default {
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