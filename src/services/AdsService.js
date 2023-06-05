import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class AdsService {
    async getAds(){
        const res = await api.get('api/ads')
        AppState.ads = res.data
    }
}

export const adsService = new AdsService()