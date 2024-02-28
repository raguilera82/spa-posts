import axios from "axios";
import POSTS from "../../../../fixtures/posts.json";
import { PostsBloc } from "../../../../src/core/blocs/posts.bloc";
jest.mock("axios");

describe("Post Bloc", () => {
  beforeEach(() => {
    axios.mockClear();
  });

  it("should load posts", async () => {
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: POSTS,
    });

    const bloc = PostsBloc.getInstance();
    await bloc.loadPosts();
    expect(bloc.state.posts.length).toBeGreaterThan(0);
  });
});
