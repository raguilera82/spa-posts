import { html, LitElement } from "lit";
import { AllPostsUseCase } from "../usecases/all-posts.usecase";
import { OddPostsUseCase } from "../usecases/odd-posts.usecase";
import "./../ui/posts.ui";

export class PostsComponent extends LitElement {
  static get properties() {
    return {
      posts: {
        type: Array,
        state: true,
      },
    };
  }

  async allOdds() {
    this.posts = await OddPostsUseCase.execute(this.posts);
  }

  render() {
    return html`
      <button @click="${this.allOdds}" id="oddAction">Odd</button>
      <posts-ui .posts="${this.posts}"></posts-ui>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("genk-posts", PostsComponent);
