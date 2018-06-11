import { LitElement, html } from "@polymer/lit-element/lit-element.js";

class FeedHeader extends LitElement {
  static get properties() {
    return {
      name: String,
      avatarUrl: String,
      post: String,
      addFeed: Function,
      disabled: Boolean
    }
  }

  constructor() {
    super();
    this.post = "";
    this.disabled = true;
  }

  _render(props) {
    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        .Header__container {
          padding: 4rem 0;
          display: flex;
          border-bottom: 1px solid lightgray;
        }
        .Header__userinfo {
          text-align: center;
          margin-right: 4rem;
        }
        .Header__userinfo > img {
          width: 12rem;
          height: 12rem;
          border-radius: 50%;
        }
        h5 {
          margin: 0;
        }
        .Header__newpost {
          display: flex;
          flex: 1;
          align-items: center;
        }
        .Header__newpost > textarea {
          flex: 1;
          margin-right: 4rem;
          height: 10rem;
          resize: none;
        }
        button[disabled],
        button[disabled]:hover {
          border-color: lightgray;
          background-color: lightgray;
        }
      </style>
      <div class="Header__container">
        <div class="Header__userinfo">
          <img src="${props.avatarUrl}" alt="avatar" />
          <h5>${props.name}</h5>
        </div>
        <div class="Header__newpost">
          <textarea
            oninput="${this.updatePost.bind(this)}"
            value="${props.post}">
          </textarea>
          <button
            class="button-primary" disabled="${props.disabled}"
            onclick="${this.postFeed.bind(this)}">
            Send
          </button>
        </div>
      </div>
    `;
  }

  updatePost(e) {
    this.post = e.path[0].value;
    if (this.post.length > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  postFeed() {
    this.addFeed({
      name: this.name,
      avatarUrl: this.avatarUrl,
      post: this.post
    }).then(() => {
      this.post = "";
    })
  }
}

customElements.define("feed-header", FeedHeader);