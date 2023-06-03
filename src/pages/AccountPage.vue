<template>
  
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded-circle" style="max-height: 60px; aspect-ratio: 1/1; position: absolute; bottom: 5rem; right: 5rem; opacity: .9" :src="account.picture" alt="" />
    <div class="container-fluid">
      <AccountForm :profile="account"/>
    </div>
  </div>

    <!-- NOTE this div will be the "Modal" button once form is functional and completed nested within Postform.vue -->
    <div role="button">
      <i class="mdi mdi-plus fw-6 text-white" style="font-size: 60px; text-shadow: 0 0 10px black; aspect-ratio: 1/1; position: absolute; bottom: 4rem; right: 5rem; filter: brightness(2);"></i>
      <p class="fs-4" style="text-shadow: 0 0 3px black; opacity: .9; position: absolute; bottom: 1.5rem; right: 3.8rem;">Add post</p>
      <p>{{ account.email }}</p>
    </div>

</template>

<script>

import { computed } from 'vue'
import { AppState } from '../AppState'
import PostCard from '../components/PostCard.vue'
import AccountForm from '../components/AccountForm.vue'

export default {
  setup() {
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    }
  }
}

</script>

<style scoped lang="scss">

i:hover {
  transform: rotate(90deg);
  transition: 1s;
  filter: blur(1px);
}

</style>
