<template>


      <div class="container mt-5">
        <div class="row">
          <div class="col-8 offset-2 elevation-5 p-5 bright-form">

            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-floating mb-3">
                  <input name="name" class="form-control bg-grey" placeholder="Name" type="text" required v-model="editable.name">
                  <label for="name">Name:</label>
                </div>
                <div class="form-floating mb-3">
                  <input name="picture" class="form-control bg-grey" placeholder="Profile Picture" type="url" required
                    v-model="editable.picture">
                  <label for="picture">Picture:</label>
                </div>
                <div class="form-floating mb-3">
                  <input name="cover-img" class="form-control bg-grey" placeholder="cover Image" type="url" required
                    v-model="editable.coverImg">
                  <label for="cover-img">Cover Image:</label>
                </div>
                <div class="form-floating mb-3">
                  <textarea name="bio" class="form-control bg-grey" placeholder="Edit Bio..." type="text" required v-model="editable.bio"></textarea>
                  <label for="bio">About Me:</label>
                </div>
                <div class="form-floating mb-3">
                  <input name="github" class="form-control bg-grey" placeholder="Enter Link..." type="url"  v-model="editable.github">
                  <label for="github">Github URL:</label>
                </div>
                <div class="form-floating mb-3">
                  <input name="linkedin" class="form-control bg-grey" placeholder="Enter Link..." type="url"  v-model="editable.linkedin">
                  <label for="linkedin">Linkedin URL:</label>
                </div>
              </div>
              <div class="form-check pe-5">
      
                <!-- NOTE REMEMBER TO ADD ":on-change="@toggleChecked" TO THE CHECKBOX BELOW WHEN YOU NEED TO TOGGLE TRUE / FALSE FOR WHETHER OR NOT THE ACCOUNT HOLDER HAS GRADUATED FROM SCHOOL! -->
                <input class="form-check-input" type="checkbox" id="">
                <label class="form-check-label text-white" for="flexCheckDefault">
                  Graduated? If so, check the box on the left to verify.
                </label>
              </div>
              <!-- <div class="mb-3">
                <label for="formFile" class="form-label">Upload your Resume:</label>
                <input class="form-control" type="file" id="formFile">
              </div> -->
              <div class="card-footer text-end">
                <button class="btn btn-success" type="submit">Save Changes</button>
              </div>
            </form>
            
          </div>
        </div>
      </div>

</template>

<script>

import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";



  export default {
    setup() {
      const editable = ref({})

      watchEffect(() => {
        // if ( !AppState.account ) {
        //   return
        // }
        editable.value = { ...AppState.account }
      })

      return {
        editable,
        async handleSubmit() {

          try {
            await accountService.editAccount(editable.value)
          } catch ( error ) {
            logger.error( error )
            Pop.toast( '[ACCOUNT FORM COULD NOT BE SUBMITTED]', error )
          }
        }
      }
    }
  }

</script>

<style scoped lang="scss">

.account-form {
  background-image: url('https://media.istockphoto.com/vectors/dark-blue-tech-neon-squares-background-vector-id672496066?k=6&m=672496066&s=170667a&w=0&h=GNqQGHDYA9fDA7LN6dn3_7zj_wrmOKO2cmAplKBnbP8=');
  background-size: cover;
  background-repeat: repeat;
  border-radius: .5rem;
  animation: animate 60s ease-in-out infinite;
}

.bright-form {
  backdrop-filter: blur(5px) brightness(1.5);
  border-radius: .5rem;
}



@keyframes animate {
  0%, 100% {
    background-position: left top;
  }

  25% {
    background-position: right bottom;
   }

  50% {
    background-position: left bottom;
  }

  75% {
    background-position: right top;
  }   
}

</style>