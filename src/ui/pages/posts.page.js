import { PostsBloc } from "../../core/blocs/posts.bloc";
import "./../smarts/post-actions.component";
import "./../smarts/posts.component";

export class PostsPage extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const bloc = PostsBloc.getInstance();
    if (!bloc.getState() || bloc.getState().posts.length === 0) {
      await bloc.loadPosts();
    }

    this.innerHTML = `
            <h1>Posts Page</h1>     
            <genk-posts-actions></genk-posts-actions>
            <genk-posts></genk-posts>   
        `;
  }
}

customElements.define("posts-page-genk", PostsPage);
