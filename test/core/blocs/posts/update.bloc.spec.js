import axios from "axios";
import { v4 } from "uuid";
import POSTS from "../../../../fixtures/posts.json";
import { PostsBloc } from "../../../../src/core/blocs/posts.bloc";
jest.mock("axios");

describe("Post Bloc", () => {
  beforeEach(() => {
    axios.mockClear();
  });

  it("should update a post", async () => {
    const postId = v4();
    const newPost = {
      postId: postId,
      heading: "New post title",
      content: "New post content",
    };

    const postWithChanges = {
      heading: "Post con los cambios",
      content: "Post con contenido cambiado",
    };

    const bloc = PostsBloc.getInstance();

    axios.get.mockResolvedValueOnce({
      status: 200,
      data: POSTS,
    });
    await bloc.loadPosts();

    axios.post.mockResolvedValue({
      status: 200,
      data: {
        id: 101,
        title: newPost.heading,
        body: newPost.content,
      },
    });
    await bloc.createPost(newPost);
    const postsWithNewPost = bloc.getState().posts;

    bloc.selectPost(newPost);

    axios.delete.mockResolvedValue({
      status: 200,
      data: {},
    });
    await bloc.updatePost(postWithChanges);

    const postsUpdated = bloc.getState().posts;
    expect(postsUpdated.length).toBe(postsWithNewPost.length);
  });
});
