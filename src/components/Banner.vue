<template>
  <div class="container-fluid">
      <section class="row">
          <div class="col-6 px-0" v-for="a in ads" :key="a.id">
              <img class="banner" :src="a.banner"/>
          </div>
      </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
setup() {
return {
  ads: computed(() => AppState.ads)
};
},
};
</script>

<style>

.banner {
  width: 100%;
}

</style>