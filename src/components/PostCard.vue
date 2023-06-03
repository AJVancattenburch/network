<template>

  <div class="col-md-6 offset-3 post-card my-5">
    <div class="card mb-3 mt-5">
      <div class="row g-0">
        <div class="col-md-4 rounded-start" style="height: 250px; aspect-ratio: 1/1; border: 3px solid dodgerblue;">
          <img style="height: 243px; width: 270px;" :src="post?.imgUrl" class="img-fluid rounded-start post-img" alt="No image attached">
        </div>
        <div class="col-md-8" style="height: 250px; aspect-ratio: 1/1; border-right: 3px solid lightblue; border-top: 3px solid lightblue; border-bottom: 3px solid lightblue;">
          <div class="card-body">
            <p class="card-text mt-4">{{ post?.body }}</p>
            <p class="card-text mt-5 me-4"><small class="text-body-secondary text-end">
              <p class="fs-3 pt-5" role="button" @click="post?.likeIds ? '❤️' : ''">🖤</p>
              <router-link id="router-link" :to="{ name: 'Profile', params: { id: post.creatorId }}">
                <button class="btn btn-info">Visit Profile</button>
              </router-link>
            </small></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { computed } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService.js'
import { logger } from '../utils/Logger.js'
import Pop  from '../utils/Pop.js'

export default {
  props: {
    post: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),

      async deletePost(post) {
        try {
          const yes = await Pop.confirm('Are you sure? Post deletes cannot be reverted')
          if (yes) {
            return
          }
          await postsService.deletePost(post.id)
        } catch (error) {
          logger.error( error )
          Pop.toast( '[POST DELETING...]', error )
        }
      }
    }
  }
}

</script>

<style>

.post-card {
  width: 50vw;
  max-height: 200px;
}

div.post-card>img {
  margin-right: 0;
}

</style>