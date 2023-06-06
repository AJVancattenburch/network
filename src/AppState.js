import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  liked: false,
  searchPosts: [],
  pageData: {},
  currentPage: 1,
  currentProfilePage: 1,
  totalProfilePages: 0,
  totalPages: 0,
  newerPage: null,
  olderPage: null,
  query: null,
  activeProfile: null,

  
  /** @type {import('./models/Account.js').Account} */
  account: {},
  
  /** @type {import('./models/Profile.js').Profile | null} */
  linkedin: null,
  
  /** @type {import('./models/Post.js').Post | null} */
  activePost: null,
  
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
  
  /** @type {import('./models/Post.js').Post[]} */
  profilePosts: [],

  /** @type {import('./models/Ad.js').Ad[]} */
  ads: []
  
})
