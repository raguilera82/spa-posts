import { PostsRepository } from "../repositories/posts.repository";

export class UpdatePostUseCase {
  /**
   *
   * @param {import("../model/post").PostType[]} posts
   * @param {import("../model/post").PostType} postUpdate
   */
  static async execute(posts, postUpdate) {
    const repository = new PostsRepository();
    await repository.updatePost(postUpdate.postId, postUpdate);

    return posts.map((post) =>
      post.postId === postUpdate.postId ? postUpdate : post
    );
  }
}
