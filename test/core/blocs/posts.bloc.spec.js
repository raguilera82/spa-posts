import axios from "axios";
import { v4 } from "uuid";
import { PostsBloc } from "../../../src/core/blocs/posts.bloc";
import POSTS from "./../../../fixtures/posts.json";
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

  it("should create a posts", async () => {
    /**
     * @type {import("../../../src/core/model/post").PostType}
     */
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
