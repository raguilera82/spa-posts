import "../smarts/posts-mediator.component";

export class PostsPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <h1>Posts Page</h1>     
            <genk-posts-mediator></genk-posts-mediator>    
        `;
  }
}

customElements.define("posts-page-genk", PostsPage);
