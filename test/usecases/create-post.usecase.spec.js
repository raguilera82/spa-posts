import { v4 } from "uuid";
import { Post } from "../../src/model/post";
import { PostsRepository } from "../../src/repositories/posts.repository";
import { AllPostsUseCase } from "../../src/usecases/all-posts.usecase";
import { CreatePostUseCase } from "../../src/usecases/create-post.usecase";
import POSTS from "./../../fixtures/posts.json";

jest.mock("../../src/repositories/posts.repository");

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

    const useCase = new AllPostsUseCase();
    const posts = await useCase.execute();

    const postsUpdated = await CreatePostUseCase.execute(posts, post);
    console.log("TCL: post", post);
    console.log("TCL: postsUpdated", postsUpdated[0]);

    expect(postsUpdated.length).toBe(posts.length + 1);
    expect(postsUpdated[0].postId).toBe(post.postId);
    expect(postsUpdated[0].heading).toBe(post.heading);
    expect(postsUpdated[0].content).toBe(post.content);
  });
});
