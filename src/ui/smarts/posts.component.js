import { html, LitElement } from "lit";
import { OddPostsUseCase } from "../../core/usecases/odd-posts.usecase";
import "../dumbs/posts.ui";

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
