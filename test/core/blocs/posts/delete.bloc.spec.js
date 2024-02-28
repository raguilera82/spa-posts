import axios from "axios";
import { v4 } from "uuid";
import POSTS from "../../../../fixtures/posts.json";
import { PostsBloc } from "../../../../src/core/blocs/posts.bloc";
jest.mock("axios");

describe("Post Bloc", () => {
  beforeEach(() => {
    axios.mockClear();
  });

  it("should delete a post", async () => {
    const postId = v4();
    const newPost = {
      postId,
      heading: "Post para borrar",
      content: "Post para borrar",
    };

    const bloc = PostsBloc.getInstance();
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: POSTS,
    });
    await bloc.loadPosts();
    const posts = bloc.getState().posts;

    axios.post.mockResolvedValue({
      status: 200,
      data: {
        id: 101,
        title: newPost.heading,
        body: newPost.content,
      },
    });
    await bloc.createPost(newPost);

    bloc.selectPost(newPost);

    axios.delete.mockResolvedValue({
      status: 200,
      data: {},
    });
    await bloc.deletePost();
    const postsDeleted = bloc.getState().posts;

    expect(posts.length).toBe(postsDeleted.length);
  });
});
