import axios from "axios";
import POSTS from "../../../../fixtures/posts.json";
import { PostsBloc } from "../../../../src/core/blocs/posts.bloc";
jest.mock("axios");

describe("Post Bloc", () => {
  beforeEach(() => {
    axios.mockClear();
  });

  it("should odd posts", async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: POSTS,
    });

    const bloc = PostsBloc.getInstance();
    await bloc.loadPosts();
    const oddPosts = bloc.oddPosts();
    expect(oddPosts.length).toBe(50);
  });
});
