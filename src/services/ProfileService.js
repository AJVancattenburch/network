import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { Profile } from '../models/Profile.js'

class ProfileService{
   async getProfileById(id){
      const res = await api.get('/api/profiles/' + id)
      AppState.activeProfile = new Profile(res.data)
      logger.log(AppState.activeProfile)
   }












}

export const profileService = new ProfileService()