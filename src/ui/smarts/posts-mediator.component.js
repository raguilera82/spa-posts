import { LitElement, html } from "lit";
import { PostsBloc } from "../../core/blocs/posts.bloc";
import "./post-actions.component";
import "./posts.component";

export class PostMediatorComponent extends LitElement {
  static get properties() {
    return {
      posts: {
        type: Array,
      },
      selectedPost: {
        type: Object,
      },
    };
  }

  async connectedCallback() {
    const bloc = PostsBloc.getInstance();
    await bloc.loadPosts();

    this.posts = bloc.getState().posts;
    super.connectedCallback();
  }

  handleChangePosts(e) {
    this.posts = e.detail.posts;
    this.selectedPost = null;
  }

  handleSelectedPost(e) {
    this.selectedPost = e.detail.selectedPost;
  }

  render() {
    return html`
      <genk-posts-actions
        @change-posts="${(e) => this.handleChangePosts(e)}"
        .posts="${this.posts}"
        .selectedPost="${this.selectedPost}"
      ></genk-posts-actions>
      <genk-posts
        @selected-post="${(e) => this.handleSelectedPost(e)}"
        .posts="${this.posts}"
      ></genk-posts>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("genk-posts-mediator", PostMediatorComponent);
