import { v4 } from "uuid";
import { PostsRepository } from "../../src/repositories/posts.repository";
import { AllPostsUseCase } from "../../src/usecases/all-posts.usecase";
import { CreatePostUseCase } from "../../src/usecases/create-post.usecase";
import { UpdatePostUseCase } from "../../src/usecases/update-post.usecase";
import POSTS from "./../../fixtures/posts.json";

jest.mock("../../src/repositories/posts.repository");

describe("Update Post", () => {
  beforeEach(() => {
    PostsRepository.mockClear();
  });

  it("should update posts", async () => {
    const postId = v4();
    const newPost = {
      postId: postId,
      heading: "New post title",
      content: "New post content",
    };

    PostsRepository.mockImplementation(() => {
      return {
        addPost: jest.fn().mockResolvedValue({
          id: 101,
          title: newPost.heading,
          body: newPost.content,
        }),
        getAllPosts: jest.fn().mockResolvedValue(POSTS),
        updatePost: jest.fn().mockResolvedValue(),
      };
    });
    const postWithChanges = {
      postId: postId,
      heading: "Post con los cambios",
      content: "Post con contenido cambiado",
    };

    const posts = await AllPostsUseCase.execute();

    const postsWithNewPost = await CreatePostUseCase.execute(posts, newPost);

    const postsUpdated = await UpdatePostUseCase.execute(
      postsWithNewPost,
      postWithChanges
    );

    expect(postsUpdated.length).toBe(postsWithNewPost.length);
  });
});
