import { html, LitElement } from "lit";
import { PostsBloc } from "../../core/blocs/posts.bloc";
import "../dumbs/posts.ui";

export class PostsComponent extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.postsBloc = PostsBloc.getInstance();
    this.handleState = (state) => {
      this.posts = state.posts;
      this.requestUpdate();
    };
    this.postsBloc.subscribe(this.handleState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.postsBloc.unsubscribe(this.handleState);
  }

  async allOdds() {
    this.posts = this.postsBloc.oddPosts();
    this.requestUpdate();
  }

  handleSelectedPost(e) {
    this.postsBloc.selectPost(e.detail.selectedPost);
  }

  render() {
    return html`
      <button @click="${this.allOdds}" id="oddAction">Odd</button>
      <posts-ui
        @selected-post="${(e) => this.handleSelectedPost(e)}"
        .posts="${this.posts}"
      ></posts-ui>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("genk-posts", PostsComponent);
