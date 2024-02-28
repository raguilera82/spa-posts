import { html, LitElement } from "lit";

export class PostsUI extends LitElement {
  static get properties() {
    return {
      posts: {
        type: Array,
      },
    };
  }

  selectedPost(e, post) {
    this.dispatchEvent(
      new CustomEvent("selected-post", {
        detail: {
          selectedPost: post,
        },
      })
    );
  }

  render() {
    return html`
      <ul id="posts">
        ${this.posts &&
        this.posts.map(
          (post) => html`
            <li
              class="post"
              id="post_${post.postId}"
              @click="${(e) => this.selectedPost(e, post)}"
            >
              ${post.postId} -- ${post.heading}
            </li>
          `
        )}
      </ul>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("posts-ui", PostsUI);
