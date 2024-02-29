import { LitElement, html } from "lit";
import { v4 } from "uuid";
import { PostsBloc } from "../../core/blocs/posts.bloc";

export class PostActionsComponent extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.postsBloc = PostsBloc.getInstance();
    this.handleState = (state) => {
      this.selectedPost = state.selectedPost;
      this.requestUpdate();
    };
    this.postsBloc.subscribe(this.handleState);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.postsBloc.unsubscribe(this.handleState);
  }

  render() {
    return html`<form id="postForm">
      <label>
        Title:
        <input
          type="text"
          id="title"
          .value="${this.selectedPost?.heading || ""}"
        />
      </label>
      <label>
        Content:
        <input
          type="text"
          id="content"
          .value="${this.selectedPost?.content || ""}"
        />
      </label>
      <button id="cancelButton" @click="${(e) => this.cancel(e)}">
        Cancel
      </button>
      ${this.selectedPost
        ? html`<button id="deleteButton" @click="${(e) => this.deletePost(e)}">
              Delete
            </button>
            <button
              id="updateButton"
              @click="${(e) => this.updatePost(e, this.selectedPost)}"
            >
              Update
            </button>`
        : html`<button id="addButton" @click="${(e) => this.addPost(e)}">
            Add
          </button>`}
    </form>`;
  }

  cancel(e) {
    e.preventDefault();
    this.postsBloc.selectPost(null);
  }

  async deletePost(e) {
    e.preventDefault();
    await this.postsBloc.deletePost();
  }

  async addPost(e) {
    e.preventDefault();
    const title = this.querySelector("#title").value;
    const content = this.querySelector("#content").value;

    await this.postsBloc.createPost({
      postId: v4(),
      heading: title,
      content: content,
    });
  }

  async updatePost(e, selectedPost) {
    e.preventDefault();
    const title = this.querySelector("#title").value;
    const content = this.querySelector("#content").value;

    this.postsBloc.selectPost(selectedPost);

    await this.postsBloc.updatePost({
      heading: title,
      content,
    });
  }

  clearForm() {
    this.querySelector("#title").value = "";
    this.querySelector("#content").value = "";
    this.postsBloc.selectPost(null);
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("genk-posts-actions", PostActionsComponent);
