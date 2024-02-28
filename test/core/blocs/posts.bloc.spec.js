import { v4 } from "uuid";
import { PostsBloc } from "../../../src/core/blocs/posts.bloc";
import { PostsRepository } from "../../../src/core/repositories/posts.repository";
import POSTS from "./../../../fixtures/posts.json";

jest.mock("../../../src/core/repositories/posts.repository");

describe("Post Bloc", () => {
  beforeEach(() => {
    PostsRepository.mockClear();
  });

  it("should load posts", async () => {
    PostsRepository.mockImplementation(() => {
      return {
        getAllPosts: () => {
          return POSTS;
        },
      };
    });

    const bloc = PostsBloc.getInstance();
    await bloc.loadPosts();
    expect(bloc.state.posts.length).toBeGreaterThan(0);
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

    PostsRepository.mockImplementation(() => {
      return {
        getAllPosts: () => {
          return POSTS;
        },
        addPost: jest.fn().mockResolvedValue({
          id: 101,
          title: newPost.heading,
          body: newPost.content,
        }),
      };
    });

    const bloc = PostsBloc.getInstance();
    await bloc.loadPosts();

    const postsBeforeCreate = bloc.getState().posts;

    await bloc.createPost(newPost);

    const postsUpdated = bloc.getState().posts;
    expect(postsUpdated.length).toBe(postsBeforeCreate.length + 1);
    expect(postsUpdated[0].postId).toBe(newPost.postId);
    expect(postsUpdated[0].heading).toBe(newPost.heading);
    expect(postsUpdated[0].content).toBe(newPost.content);
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

    const bloc = PostsBloc.getInstance();
    await bloc.loadPosts();
    const posts = bloc.getState().posts;

    await bloc.createPost(post);

    bloc.selectPost(post);

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

    PostsRepository.mockImplementation(() => {
      return {
        addPost: jest.fn().mockResolvedValue({
          id: 101,
          title: newPost.heading,
          body: newPost.content,
        }),
        getAllPosts: jest.fn().mockResolvedValue(POSTS),
        updatePost: jest.fn().mockResolvedValue(),
      };
    });
    const postWithChanges = {
      heading: "Post con los cambios",
      content: "Post con contenido cambiado",
    };

    const bloc = PostsBloc.getInstance();
    await bloc.loadPosts();

    await bloc.createPost(newPost);
    const postsWithNewPost = bloc.getState().posts;

    bloc.selectPost(newPost);

    await bloc.updatePost(postWithChanges);
    const postsUpdated = bloc.getState().posts;

    expect(postsUpdated.length).toBe(postsWithNewPost.length);
  });
});
