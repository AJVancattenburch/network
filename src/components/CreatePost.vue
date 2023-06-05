<template>


  <div class="col-9 create-card card offset-2 elevation-5 mt-5">
    <form @submit.prevent="submitPost()">
      <div class="card-body">
        <div class="form-group px-3 pt-3">
          <label for="image">Image</label>
          <input type="text" class="form-control card-text" id="imgUrl" placeholder="insert image here" v-model="editable.imgUrl">
        </div>
        <div class="form-group p-3">
          <label class="card-body" for="body"></label>
          <textarea class="form-control card-text create-body" id="body" rows="3" v-model="editable.body"></textarea>
        </div>
      </div>
        <div class="card-footer d-flex">
          <div class="col-6 text-start ms-1" style="opacity: .8;">
            <button type="button" style="filter: blur(-2px) brightness(1.2)" class="btn btn-secondary  pt-3">Close</button>
          </div>
          <div class="col-6 text-end pe-2" style="opacity: .9;">
            <button type="submit" style="filter: brightness(1.5); text-shadow: 0 0 2px white" class="btn btn-primary text-end text-black pt-3"><b>Create</b></button>
          </div>
        </div>
    
          <!-- <p class="fs-5" style="text-shadow: 0 0 3px black; opacity: .9; position: absolute; bottom: -1rem; right: 2rem;">Add post</p>
          <i :role="button" type="submit" class="mdi mdi-plus fw-6 text-white" style="font-size: 60px; text-shadow: 0 0 10px black; aspect-ratio: 1/1; position: absolute; bottom: -1rem; right: 2rem; filter: brightness(2);"></i>
          <img class="rounded-circle" style="max-height: 60px; aspect-ratio: 1/1; position: absolute; bottom: 5rem; right: 5rem; opacity: .9" :src="account?.picture" alt="" /> -->
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
}

</script>

<style scoped lang="scss">

.create-card {
  background-color: rgba(0, 0, 0, .5);
  border-radius: .5rem;
  color: white;
  text-shadow: 0 0 3px black;
  width: 100%;
  max-width: 800px;
  min-height: 400px;
  max-height: 600px;
  margin-left: 21.5rem;
  position: relative;
  filter: blur(.5px) brightness(1.2);
  border: 1px solid rgba(255, 255, 255, .5);
  box-shadow: 0 0 10px black;
  transition: all .3s ease-in-out;
}

.create-body::-webkit-scrollbar-button {
  display: none;
}

</style>