import { LitElement, html } from "lit";
import { v4 } from "uuid";
import { CreatePostUseCase } from "../usecases/create-post.usecase";
import { DeletePostUseCase } from "../usecases/delete-post.usecase";
import { UpdatePostUseCase } from "../usecases/update-post.usecase";

export class PostActionsComponent extends LitElement {
  static get properties() {
    return {
      posts: {
        type: Array,
      },
      selectedPost: {
        type: Object,
        state: true,
      },
    };
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
        ? html`<button
              id="deleteButton"
              @click="${(e) => this.deletePost(e, this.selectedPost)}"
            >
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
    this.selectedPost = null;
  }

  async deletePost(e, selectedPost) {
    e.preventDefault();
    this.posts = await DeletePostUseCase.execute(
      this.posts,
      selectedPost.postId
    );
    this.notifyChangePosts(this.posts);
  }

  async addPost(e) {
    e.preventDefault();
    const title = this.querySelector("#title").value;
    const content = this.querySelector("#content").value;
    this.posts = await CreatePostUseCase.execute(this.posts, {
      postId: v4(),
      heading: title,
      content: content,
    });
    this.notifyChangePosts(this.posts);
  }

  async updatePost(e, selectedPost) {
    e.preventDefault();
    const title = this.querySelector("#title").value;
    const content = this.querySelector("#content").value;
    this.posts = await UpdatePostUseCase.execute(this.posts, {
      postId: selectedPost?.postId,
      heading: title,
      content: content,
    });
    this.notifyChangePosts(this.posts);
  }

  notifyChangePosts(posts) {
    this.dispatchEvent(
      new CustomEvent("change-posts", {
        detail: {
          posts: posts,
        },
      })
    );
    this.clearForm();
  }

  clearForm() {
    this.querySelector("#title").value = "";
    this.querySelector("#content").value = "";
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("genk-posts-actions", PostActionsComponent);
