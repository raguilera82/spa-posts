import { BaseBloc } from "./base";

import { AllPostsUseCase } from "../usecases/all-posts.usecase";
import { CreatePostUseCase } from "../usecases/create-post.usecase";
import { DeletePostUseCase } from "../usecases/delete-post.usecase";
import { UpdatePostUseCase } from "../usecases/update-post.usecase";

export class PostsBloc extends BaseBloc {
  static instance = null;

  static state = {
    posts: [],
    selectePost: {},
  };

  constructor() {
    super("Posts_state");
    PostsBloc.instance = this;
  }

  /**
   * @returns {PostsBloc}
   */
  static getInstance() {
    if (!PostsBloc.instance) {
      PostsBloc.instance = new PostsBloc();
    }
    return PostsBloc.instance;
  }

  async loadPosts() {
    const posts = await AllPostsUseCase.execute();
    this.setState({
      posts: posts,
    });
  }

  async createPost(post) {
    const postsWithNew = await CreatePostUseCase.execute(
      this.getState().posts,
      post
    );
    this.setState({
      posts: postsWithNew,
    });
  }

  async deletePost() {
    const selectedPost = this.getState().selectedPost;
    const postsRemoved = await DeletePostUseCase.execute(
      this.getState().posts,
      selectedPost.postId
    );
    this.setState({
      posts: postsRemoved,
    });
  }

  async updatePost() {
    const selectedPost = this.getState().selectedPost;
    const postsWithUpdated = await UpdatePostUseCase.execute(
      this.getState().posts,
      selectedPost
    );
    this.setState({
      posts: postsWithUpdated,
    });
  }

  /**
   *
   * @param {import("../model/post").PostType} post
   */
  selectPost(post) {
    this.setState({
      selectedPost: post,
    });
  }
}
