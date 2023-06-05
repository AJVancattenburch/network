<template>
  
  <div class="col-9 card offset-2 elevation-5 mt-5">
    <form @submit.prevent="submitPost()">
      <div class="card-body">
        <div class="form-group px-3 pt-3">
          <label for="image">Image</label>
          <input type="text" class="form-control card-text" id="imgUrl" placeholder="insert image here" v-model="editable.imgUrl">
        </div>
        <div class="form-group p-3">
          <label class="card-body" for="body">Body</label>
          <textarea class="form-control card-text" id="body" rows="3" v-model="editable.body"></textarea>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-secondary">Close</button>
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
    
          <!-- <p class="fs-5" style="text-shadow: 0 0 3px black; opacity: .9; position: absolute; bottom: -1rem; right: 2rem;">Add post</p>
          <i :role="button" type="submit" class="mdi mdi-plus fw-6 text-white" style="font-size: 60px; text-shadow: 0 0 10px black; aspect-ratio: 1/1; position: absolute; bottom: -1rem; right: 2rem; filter: brightness(2);"></i>
          <img class="rounded-circle" style="max-height: 60px; aspect-ratio: 1/1; position: absolute; bottom: 5rem; right: 5rem; opacity: .9" :src="account?.picture" alt="" /> -->
      </div>
    </form>
  </div>

</template>

<script>
// import { logger } from "../utils/Logger.js"
// import Pop from "../utils/Pop.js"
// import { postsService } from "../services/PostsService.js"
// import { computed } from "vue"

import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { ref } from "vue";

export default {
  setup() {
    const editable = ref ({})
    return {
      editable,
        imgUrl: '',
        body: '',

      async submitPost() {
        try {
          const formData = editable.value
          await postsService.submitPost(formData)
          editable.value = {}
        } catch ( error ) {
          logger.error( error )
          Pop.toast( '[GETTING ALL POSTS...]', 'success' )
        }
      }
    }
  }
  // setup() {
  //   // const account = computed(() => AppState.account)
  //   // const posts = computed(() => AppState.posts)
  //   // const postsLength = computed(() => AppState.posts.length)
  //   const newPost = ref ({})
  //   return {
  //     newPost,
  //     async createPost() {

  //       try {
  //         await postsService.createPost(newPost.value)
  //       } catch ( error ) {
  //         logger.error( error )
  //         Pop.toast( '[GETTING ALL POSTS...]', 'success' )
  //       }
  //     }
  //     }
    // }

    
  
}

</script>

<style scoped lang="scss"></style>