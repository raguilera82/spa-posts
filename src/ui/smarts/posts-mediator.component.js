import { LitElement, html } from "lit";
import { AllPostsUseCase } from "../../core/usecases/all-posts.usecase";
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
    this.posts = await AllPostsUseCase.execute();
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
