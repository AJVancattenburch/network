<template>

  <header class="" container-fluid>
    <Navbar />
    <Banner />
  </header>
  <main>
    <router-view />
  </main>

  <!-- <div class="modal fade" id="create-post" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div> -->
        <!-- <form @submit.prevent="createPost()">
          <div class="modal-body">
            <div class="form-group">
              <label for="image">Image</label>
              <input type="text" class="form-control" id="imgUrl" placeholder="insert image here" v-model="imgUrl">
            </div>
            <div class="form-group">
              <label for="body">Body</label>
              <textarea class="form-control" id="body" rows="3" v-model="body"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
          </form> -->
      <!-- </div>
    </div>
  </div> -->

</template>

<script>

import { computed, onMounted} from 'vue';
import { AppState } from './AppState';
import Banner from './components/Banner.vue';
import { adsService } from './services/AdsService';
// import { postsService } from './services/PostsService';
import { logger } from './utils/Logger';
import Pop from './utils/Pop';

export default {
  name: "App",
  setup() {
    
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        logger.error('Getting Ads', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
    getAds()
    })
    return {
      // editable,
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads),
    }
  },

  components: { Banner },

}

</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

</style>
