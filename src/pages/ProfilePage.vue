<template>
  
  <!-- <div v-if="profile.id == account.id">
    <router-link class="link active-link text-end fs-3" style="color: darkblue;" :to="{ name: 'Account' }">Edit Profile</router-link>
  </div> -->
      <div class="card" v-if="profile">
        <img class="img-fluid profile" style="opacity: .7;" :src="profile?.coverImg" :alt="profile?.name">
        <div class="d-flex flex-column align-items-end me-5 fs-4">
          <img class="profile-img rounded-circle img-fluid" :src="profile?.picture" style="opacity: .95; border: 5px solid gray;">
          <div class="me-5 pe-2 pt-3">
            <b>{{ profile?.name }}</b>
          </div>
        </div>
        <div>
          <div class="col-9 offset-1">
            <div class="edu-card card border-info mb-3" style="">
              <div class="card-header text-center my-3">Education</div>
              <div class="card-body">
                <b class="card-title">Social Media Links:</b>
                <p class="card-text">{{ profile?.github }}  {{ profile?.linkedin }}</p>
                <b class="card-title">Attending School:</b>
                <p class="card-text">{{ profile?.graduated ? 'Graduated w/ honors from Boise CodeWorks' : 'Student at Boise CodeWorks' }}</p>
                <b><u><a :href="profile?.resume">Click to view Resume</a></u></b>
              </div>
            </div>
          </div>
          <div class="col-11 fs-3 text-center"><b>About Me:</b> <br>
            <em class="fs-5 fw-5 text-muted" style="text-shadow: 0 0 1px black;">{{ profile?.bio }}</em>
          </div>
        </div>
        <div class="col-11 text-center fs-3 pt-5 mt-5">
          {{ profile?.name }}'s Recent Posts:
        </div>

        <!-- <div class="card-body">
          <a :href="">Link</a>
        </div> -->

        <div class="col-10 blog-list  ms-5 text-dark" v-for="p in posts" :key="p.id">
          <h3 class="text-center mb-5"></h3>
          <PostCard :post="p" />
        </div>
        
      </div>
      <div style="position: absolute; top: 50%; left: 50%;" v-else>
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { profileService } from '../services/ProfileService.js';
import { postsService } from '../services/PostsService.js';
import { logger } from "../utils/Logger.js";
   export default {
      
      setup(){
         const route = useRoute(); 
         async function getProfileById(){
            try {
               await profileService.getProfileById(route.params.id)
            } catch ( error ) {
                logger.error( error )
                Pop.toast( '[GOING TO ANOTHER USERS PROFILE...]', error )
            }
         } 
         async function getPostsByProfileId(){
            try {
               await postsService.getPostsByProfileId(route.params.id)
            } catch ( error ){
                Pop.toast( '[GETTING SINGLE USERS POSTS...]', error )
            }
         } 
         onMounted(() => {
            getProfileById()
            getPostsByProfileId()
         })
         return {
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),

         }
      }
   }
</script>


<style scoped lang="scss">

   .profile {
      background-size: contain;
      background-image: v-bind(coverImg);
      max-height: 600px;

   }

   .profile-img {
    margin-top: -2rem;
    max-width: 300px;
    aspect-ratio: 1/1;
   }

   .edu-card {
    margin-top: -100rem;
   }

</style>