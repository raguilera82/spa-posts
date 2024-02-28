import { PostsRepository } from "../repositories/posts.repository";

export class CreatePostUseCase {
  /**
   *
   * @param {import("../model/post").PostType[]} posts
   * @param {import("../model/post").PostType} post
   * @returns {Promise<import("../model/post").PostType[]>}
   */
  static async execute(posts, post) {
    const repository = new PostsRepository();
    const postApiCreated = await repository.addPost(post.heading, post.content);

    /**
     * @type {import("../model/post").PostType}
     */
    const postCreated = {
      postId: post.postId,
      heading: postApiCreated.title,
      content: postApiCreated.body,
    };

    return [postCreated, ...posts];
  }
}
