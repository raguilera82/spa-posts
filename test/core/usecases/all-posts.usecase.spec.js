import { PostsRepository } from "../../../src/core/repositories/posts.repository";
import { AllPostsUseCase } from "../../../src/core/usecases/all-posts.usecase";
import POSTS from "./../../../fixtures/posts.json";

jest.mock("../../../src/core/repositories/posts.repository");

describe("All posts Use Case", () => {
  beforeEach(() => {
    PostsRepository.mockClear();
  });

  it("should execute correct", async () => {
    PostsRepository.mockImplementation(() => {
      return {
        getAllPosts: () => {
          return POSTS;
        },
      };
    });

    const posts = await AllPostsUseCase.execute();

    expect(posts).toHaveLength(POSTS.length);
  });
});