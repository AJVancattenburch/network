export class Post {
  constructor(data) {
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
  }
}