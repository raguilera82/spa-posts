import { PostsRepository } from "../repositories/posts.repository";

export class DeletePostUseCase {
  static async execute(posts, postId) {
    const repository = new PostsRepository();
    await repository.deletePost(postId);

    return posts.filter((post) => post.postId !== postId);
  }
}
