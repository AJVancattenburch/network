import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log(AppState.posts)
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













}

export const postsService = new PostsService()