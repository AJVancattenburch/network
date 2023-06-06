<template>


<div class="about text-center bg-account">
  <h1 class="text-light pt-3">Welcome {{ account.name }}</h1>
  <div class="container-fluid">
  <AccountForm :profile="account"/>
  <CreatePost :profile="account" />
  </div>
</div>


  <div class="d-flex">
    <div class="p-4 ms-4 pe-1 text-center col-6 mt-5">
      <button :disabled="!newerPage" @click="changePage(newerPage)" class="btn btn-light mt-5">Previous Page</button>
    </div>
    <div class="p-4 ms-4 pe-1 text-center col-5 mt-5">
      <button :disabled="!olderPage" @click="changePage(olderPage)" class="btn btn-light me-5 mt-5">Next Page</button>
    </div>
  </div>
    <div class="col-10 ms-5 text-dark" v-for="p in posts" :key="p.id">
      <div class="text-center" v-if="p.creatorId == account.id">
      <h3 class="text-center mb-5"></h3>
      <PostCard :post="p" />
    </div>
  </div>

    <!-- NOTE this div will be the "Modal" button once form is functional and completed nested within Postform.vue -->
    
</template>

<script>

import { computed } from 'vue'
import { AppState } from '../AppState'
import PostCard from '../components/PostCard.vue'
import AccountForm from '../components/AccountForm.vue'
import { postsService } from '../services/PostsService.js'
import { logger } from '../utils/Logger.js'
import Pop  from '../utils/Pop.js'
import { onMounted } from 'vue'
import CreatePost from '../components/CreatePost.vue'

export default {
  name: 'AccountPage',
  components: {
    PostCard,
    AccountForm,
    CreatePost,
    
  },
  setup() {
    // const postsLength = computed(() => AppState.posts.length)
    
    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.error(error)
        Pop.toast('[GETTING ALL POSTS...]', error)
      }
    }

    

    onMounted(() => {
      getPosts()

    })

    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      olderPage: computed(() => AppState.olderPage),
      newerPage: computed(() => AppState.newerPage),
    }
  },
  methods: {
    async deletePost(post) {
      try {
        await postsService.deletePost(post.id)
        Pop.toast('[GOING POSTAL WITH THIS DELETING...]', 'success')
      } catch (error) {
        logger.error(error)
        Pop.toast('[ERMERGERRRRD! A DURLEETERED PURST!...]', error)
      }
    },

    async changePage(url) {
        try {
          logger.log(url)
          await postsService.changePage(url)

        } catch (error) {
          logger.error(error)
          Pop.toast('[CHANGE PAGE ERROR]', error)
        }
      }
  }

}

</script>

<style scoped lang="scss">

.bg-account {
  background-image: url('https://media.istockphoto.com/vectors/dark-blue-tech-neon-squares-background-vector-id672496066?k=6&m=672496066&s=170667a&w=0&h=GNqQGHDYA9fDA7LN6dn3_7zj_wrmOKO2cmAplKBnbP8=');
  background-size: cover;
  background-repeat: repeat;
  padding-bottom: 20rem;
}

main {
  background-image: url('https://media.istockphoto.com/vectors/dark-blue-tech-neon-squares-background-vector-id672496066?k=6&m=672496066&s=170667a&w=0&h=GNqQGHDYA9fDA7LN6dn3_7zj_wrmOKO2cmAplKBnbP8=');
  background-size: cover;
  background-repeat: repeat;
}

</style>
