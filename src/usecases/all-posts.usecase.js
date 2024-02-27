import { v4 } from "uuid";
import { Post } from "../model/post";
import { PostsRepository } from "../repositories/posts.repository";

export class AllPostsUseCase {
  /**
   *
   * @returns {Promise<import("../model/post").PostType[]>}
   */

  async execute() {
    const repository = new PostsRepository();
    const posts = await repository.getAllPosts();
    return posts.map(
      (post) =>
        new Post({
          postId: post.id || v4(),
          heading: post.title,
          content: post.body,
        })
    );
  }
}
