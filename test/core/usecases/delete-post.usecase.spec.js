import { v4 } from "uuid";
import { PostsRepository } from "../../../src/core/repositories/posts.repository";
import { AllPostsUseCase } from "../../../src/core/usecases/all-posts.usecase";
import { CreatePostUseCase } from "../../../src/core/usecases/create-post.usecase";
import { DeletePostUseCase } from "../../../src/core/usecases/delete-post.usecase";
import POSTS from "./../../../fixtures/posts.json";

jest.mock("../../../src/core/repositories/posts.repository");

describe("Delete post", () => {
  beforeEach(() => {
    PostsRepository.mockClear();
  });

  it("should delete a post", async () => {
    const postId = v4();
    const post = {
      postId,
      heading: "Post para borrar",
      content: "Post para borrar",
    };

    PostsRepository.mockImplementation(() => {
      return {
        addPost: jest.fn().mockResolvedValue({
          id: 101,
          title: post.heading,
          body: post.content,
        }),
        getAllPosts: jest.fn().mockResolvedValue(POSTS),
        deletePost: jest.fn(),
      };
    });

    const posts = await AllPostsUseCase.execute();

    const postsCreated = await CreatePostUseCase.execute(posts, post);
    const postsDeleted = await DeletePostUseCase.execute(postsCreated, postId);
    expect(posts.length).toBe(postsDeleted.length);
  });
});
