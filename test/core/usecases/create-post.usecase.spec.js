import { v4 } from "uuid";
import { Post } from "../../../src/core/model/post";
import { PostsRepository } from "../../../src/core/repositories/posts.repository";
import { AllPostsUseCase } from "../../../src/core/usecases/all-posts.usecase";
import { CreatePostUseCase } from "../../../src/core/usecases/create-post.usecase";
import POSTS from "./../../../fixtures/posts.json";

jest.mock("../../../src/core/repositories/posts.repository");

describe("Create post", () => {
  beforeEach(() => {
    PostsRepository.mockClear();
  });

  it("should create a post", async () => {
    /**
     * @type {import("../../src/model/post").PostType}
     */
    const post = new Post({
      postId: v4(),
      heading: "Titulo create post",
      content: "Cuerpo create post",
    });

    PostsRepository.mockImplementation(() => {
      return {
        addPost: jest.fn().mockResolvedValue({
          id: 101,
          title: post.heading,
          body: post.content,
        }),
        getAllPosts: jest.fn().mockResolvedValue(POSTS),
      };
    });

    const posts = await AllPostsUseCase.execute();

    const postsUpdated = await CreatePostUseCase.execute(posts, post);

    expect(postsUpdated.length).toBe(posts.length + 1);
    expect(postsUpdated[0].postId).toBe(post.postId);
    expect(postsUpdated[0].heading).toBe(post.heading);
    expect(postsUpdated[0].content).toBe(post.content);
  });
});
