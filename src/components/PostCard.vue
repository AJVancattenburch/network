<template>

  <div class="col-md-6 offset-3 my-5">
    <div class="card mb-3 mt-5 post-card">
      <div class="row g-0" style="border: 3px solid dodgerblue; border-radius: .5rem;">
        <div class="col-md-4 rounded-start" style="height: 250px; aspect-ratio: 1/1; border-right: 3px solid dodgerblue;">
          <img style="height: 250px; width: 270px;" :src="post?.imgUrl" class="img-fluid rounded-start post-img" alt="No image attached">
        </div>
        <div class="col-md-8" style="height: 250px; aspect-ratio: 1/1;">
          <div class="card-body post-body">
            <p class="card-text me-5">{{ post?.body }}</p>
              <small class="text-body-secondary text-end">
              <p class="fs-3 pt-5" role="button" @click="post?.likeIds ? '❤️' : ''">🖤</p>
              <router-link id="router-link" :to="{ name: 'Profile', params: { id: post.creatorId }}">
                <img class="rounded-circle user-img" style="aspect-ratio: 1/1; max-height: 75px; border: 2px solid gray;" :src="post?.creator.picture" :alt="post?.creator.name">
              </router-link>
            </small>
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

<style scoped lang="scss">

.post-card {
  background-color: #00000080;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 1px black;
  border-radius: 3px;
  box-shadow: 0 0 5px black;
  border-style: inset groove;
}

div.post-card>img {
  margin-right: 0;
}

.post-body {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  box-shadow: 0 0 10px black;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
  text-shadow: 0 0 1px black;
  padding: 1rem;
  height: 250px; 
}

.user-img {
  position: absolute;
  top: 10%;
  left: 97%;
  transform: translate(-50%, -50%);
  transition: .5s;
  cursor: pointer;
  user-select: none;
  filter: drop-shadow(0 0 3px black) brightness(.9);
}

.user-img:hover {
  transform: translate(-50%, -50%) scale(1.1);
  filter: brightness(1.2);
  transition: .5s;
}

</style>