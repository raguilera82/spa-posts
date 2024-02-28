import { UtilsService } from "../services/utils.services";

export class OddPostsUseCase {
  static async execute(posts) {
    const oddPosts = posts.filter((post) => UtilsService.isOdd(post.postId));
    return oddPosts;
  }
}