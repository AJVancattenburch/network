<template>

  <div class="col-md-5 offset-4 my-5 ps-3">
    <div class="card mb-3 mt-5 ms-4 post-card post-list">
      <div class="row g-0" style="border: 3px solid dodgerblue; border-radius: .5rem;">

        <div class="col-md-4 rounded-start" style="height: 250px; aspect-ratio: 1/1; border-right: 3px solid dodgerblue;">
          <img style="height: 250px; width: 270px;" :src="post?.imgUrl" class="img-fluid rounded-start post-img" alt="No image attached">
        </div>
        
        <div class="col-md-8 post-card" style="height: 250px; aspect-ratio: 1/1;">
          <p class="mt-2 mb-2 ms-3">
            {{ post?.creator.name }}
          </p>
          <div class="card-body post-body">
            <p class="card-text me-5 scrollable">{{ post?.body }}</p>
            <div class="text-body-secondary text-end">
              <!-- <p class="card-text"><small class="text-muted">{{ post?.createdAt }}</small></p> -->
              <div class="text-center card-text text-white">
                <p v-if="post?.likePost"> 
                  <i @click="likePost(post?.id)" class="mdi mdi-heart-outline"></i>
                  <span class="badge bg-info card-text">{{ post?.likeIds.length }}</span>
                </p>
                <p v-else>
                  <i @click="likePost(post?.id)" class="mdi mdi-heart"></i>
                  <span class="badge bg-info card-text">{{ post?.likeIds.length }}</span>
                </p>
                <p class="card-text text-white me-5"> Created on: {{ new Date( post?.creator.createdAt ).toLocaleDateString('en-US', { year: 'numeric',
                  month: 'short', day: 'numeric'}) }}
                </p>
              </div>
              <router-link id="router-link" :to="{ name: 'Profile', params: { id: post.creatorId }}">
                <img class="rounded-circle user-img" style="aspect-ratio: 1/1; max-height: 75px; border: 2px solid gray;" :src="post?.creator.picture" :alt="post?.creator.name">
              </router-link>

              <div class="card-footer delete-button">
                <button @click="deletePost(post?.id)" v-if="post?.creator.id == account?.id" class="btn btn-danger" title="Delete Post">
                  <i class="mdi mdi-delete"></i>
                </button>
              </div>
              
            </div>
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
// import { logger } from '../utils/Logger.js'
import Pop  from '../utils/Pop.js'
import { logger } from "../utils/Logger.js"
// import { useRoute, useRouter } from 'vue-router'
// import { logger } from "../utils/Logger.js"
// import { onMounted } from 'vue'

export default {
  name: 'PostCard',

    props: {

      post: { type: Object,
              required: true },
    },

    setup() {
      return {
        posts: computed(() => AppState.posts),
        account: computed(() => AppState.account),
      // const route = useRoute(),

      async likePost(postId){
        try {
          AppState.liked = !AppState.liked
            Pop.toast( 'Liked Post!', 'success' )
            await postsService.likePost(postId)
        } catch (error) {
            Pop.toast( 'You must be logged in to like posts.', error )
        }
      },

      async deletePost(postId) {
        try {
          if ( this.creatorId !== AppState.account.id ) {
            Pop.toast( "You can't delete someone else's post", 'error' )
          }
          const yes = await Pop.confirm('Are you sure you want to delete this post?')

          if ( !yes ) {
            return
          }
          await postsService.deletePost(postId)
        } catch ( error ) {
          logger.error( '[POSTAL DELETION!]', error )
          Pop.toast( '[POST DELETED]', error )
        }
      },

    };
      
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
  height: 208px; 
}

.delete-button {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
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

.post-list:hover {
  opacity: 1;
  transform: scale(1.05);
  filter: brightness(1.2);
  transition: .5s;
 }

</style>