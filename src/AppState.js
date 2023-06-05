import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  liked: false,
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Profile.js').Profile | null} */
  activeProfile: null,
  linkedin: null,
  /** @type {import('./models/Post.js').Post | null} */
  activePost: null,

  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  /** @type {import('./models/Post.js').Post[]} */
  profilePosts: [],
  // nextPageUrl: [],
  // previousPageUrl: [],

  /** @type {import('./models/Ad.js').Ad[]} */
  ads: []
  
})
