import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
// import {profileService} from "./ProfileService.js"


class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
  }

  async submitPost(formData){
    if(!AppState.account){
        throw new Error('You must sign up or log in to create posts.')
    }
    logger.log('formData', formData)
    const res = await api.post('api/posts', formData)
    logger.log('[WHAT IN THE RES?]', res.data)
    AppState.posts.unshift(new Post(res.data))
  }

  async getPostsByProfileId(id){
    AppState.posts = [] 
    const res = await api.get('api/posts', {
      params: {
        creatorId: id,
      }
    })
    logger.log('well...', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
  }

  async likePost(postId){
    if ( !AppState.account === null ) {
        throw new Error ( 'You must be signed in to like posts!' )
    }
    const res = await api.post(`api/posts/${postId}/like`)
    // let post = AppState.posts.find(p => p.id == postId)
    const index = AppState.posts.findIndex(p => p.id == postId)
    AppState.posts.splice(index, 1, new Post(res.data))
}

//FIXME - this is not working. I think it's because I'm not passing the id correctly. Also tried to pass the whole post object, but that didn't work either.
  async deletePost(postId) {
      const res = await api.delete(`api/posts/${postId}`)
      logger.log('[PLEASE WORK!]', res.data)
      AppState.posts = AppState.posts.filter(p => p.id !== postId)

  }
  
  // delete function is not working
  // async deletePost(id) {
  //   const res = await api.delete('api/posts/:id', id)
  //   logger.log(res.data)
  //   AppState.posts = AppState.posts.filter(p => p.id !== id)
  // }
  
  




}

export const postsService = new PostsService()