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
          <div class="col-7 offset-2">
            <div class="border-info mb-3 edu-card">
              <h4 class="card-header text-center text-muted my-3">My Info:</h4>
              <div class="card-body">
                <b class="card-title">LinkedIn: </b>
                <div>
                  <a  style="color: blue;" :href="activeProfile.linkedin" v-if="activeProfile.linkedin ? activeProfile.linkedin : true">
                  <i title="linkedin" name="linkedin" class="fs-2 mdi mdi-linkedin selectable"> {{ profile?.linkedin }} </i></a>
                </div>
                <b class="card-title">Github: </b>
                <div>
                  <a :href="profile?.github" v-if="profile?.github ? profile?.github : ''">
                    <i title="github" name="github" class="fs-2 mdi mdi-github selectable">  </i></a>
                </div>
                <b class="card-title">Resume: </b>
                <div>
                  <a :href="profile?.resume" v-if="profile?.resume ? profile?.resume : true">
                    <i title="resume" name="resume" class="fs-2 mdi mdi-file text-blue selectable mb-1"> {{ profile?.resume }} </i>
                  </a>
                </div>
                <div class="mt-3">
                  <b class="card-title">Attending School:</b>
                  <br>
                  <span class="card-text" v-if="activeProfile.graduated = true ? 'Student at Boise CodeWorks' : 'Graduated with honors from Boise CodeWorks'"> {{ activeProfile.graduated }} </span>
                </div>
                <div class="mt-3">
                  <b class="card-title">Email:</b>
                  <p class="card-text">📩: {{ profile?.email }} </p>
                </div>
           
                <span class="card-text" v-if="profile?.class ? profile?.class : ''"></span>
                <!-- <a 
                :href="activeProfile?.github" 
                v-if="activeProfile?.github ? activeProfile?.github : ''">
                  <i title="github-icon" class="mdi mdi-github icon ms-4 selectable"></i>
                </a>
                <a 
                :href="activeProfile?.linkedin" 
                v-if="activeProfile?.linkedin ? activeProfile?.linkedin : ''">
                  <i title="linkedin-icon" class="mdi mdi-linkedin icon ms-4 selectable"></i>
                </a> -->
                <!-- <a 
                :href="activeProfile?.resume" 
                v-if="activeProfile?.resume ? activeProfile?.resume : ''">
                  <i title="resume-icon" class="mdi mdi-file icon ms-4 selectable text-blue"></i>
                  <u><b>Click to view Resume</b></u>
                </a> -->
                <!-- <p class="card-text"> {{ activeProfile?.subs ? activeProfile?.subs : true }}</p> -->
            </div>
          </div>
          <div class="col-11 offset-1 fs-3 bio card p-4"><b>About Me:</b> <br>
            <em class="fs-5 fw-5 text-muted" style="text-shadow: 0 0 1px black;">{{ profile?.bio }}</em>
          </div>
        </div>
        <div class="col-11 text-center fs-3 pt-5">
          {{ profile?.name }}'s Recent Posts:
        </div>
        <br><br>
        <div class="col-11 offset-1 mt-3 post-list">
          <div class="col-10 ms-5 text-dark" v-for="p in posts" :key="p.id">
            <h3 class="text-center mb-5"></h3>
            <PostCard :post="p" />
            <!-- <div class="text-center col-3" v-if="creatorId == account.id">
              <button class="btn btn-danger mb-3" @click="deletePost(post)">Delete</button> -->
            <!-- </div> -->
          </div>
        </div>
        </div>
      </div>
      <!-- <div style="position: absolute; top: 50%; left: 50%;" v-else>
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div> -->
 
      

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
            activeProfile: computed(() => AppState.activeProfile),

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
    margin-top: -5rem;
    max-width: 300px;
    aspect-ratio: 1/1;
   }

   .bio {
    border: 3px solid dodgerblue;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .5);
    position: relative;
    top: -5rem;
    left: -8rem;
   }

   .edu-card {
    border: 3px solid dodgerblue;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .5);
    position: relative;
    top: -11rem;
    left: -5rem;
   }

   .post-list {
    position: relative;
    top: -10rem;
    left: -5rem;
    border-top: 3px solid dodgerblue;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .5);
   }

    .selectable {
      cursor: pointer;
      user-select: none;
    }

</style>