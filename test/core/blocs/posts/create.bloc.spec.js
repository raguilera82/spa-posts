import axios from "axios";
import { v4 } from "uuid";
import POSTS from "../../../../fixtures/posts.json";
import { PostsBloc } from "../../../../src/core/blocs/posts.bloc";
jest.mock("axios");

describe("Post Bloc", () => {
  beforeEach(() => {
    axios.mockClear();
  });

  it("should create a posts", async () => {
    const newPost = {
      postId: v4(),
      heading: "Heading new post",
      content: "Content new post",
    };

    const bloc = PostsBloc.getInstance();
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: POSTS,
    });
    await bloc.loadPosts();

    const postsBeforeCreate = bloc.getState().posts;

    axios.post.mockResolvedValue({
      status: 200,
      data: {
        id: 101,
        title: newPost.heading,
        body: newPost.content,
      },
    });
    await bloc.createPost(newPost);

    const postsUpdated = bloc.getState().posts;
    expect(postsUpdated.length).toBe(postsBeforeCreate.length + 1);
    expect(postsUpdated[0].postId).toBe(newPost.postId);
    expect(postsUpdated[0].heading).toBe(newPost.heading);
    expect(postsUpdated[0].content).toBe(newPost.content);
  });
});
