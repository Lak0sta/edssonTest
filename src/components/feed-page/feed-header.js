import { LitElement, html } from "@polymer/lit-element/lit-element.js";

class FeedHeader extends LitElement {
  static get properties() {
    return {
      name: String,
      avatarUrl: String,
      post: String,
      addPost: Function,
      disabled: Boolean,
      error: Boolean
    }
  }

  constructor() {
    super();
    this.post = "";
    this.disabled = true;
    this.error = false;
  }

  _render(props) {
    let error;
    if (!props.error) {
      error = html``
    } else {
      error = html`<span class="error">Field must contain only letters and numbers</span>`
    }
    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        .header {
          display:flex;
          flex-direction: column;
          border-bottom: 1px solid lightgray;
        }

        .header__container {
          padding: 1rem 0;
          display: flex;
        }
        .header__userinfo {
          text-align: center;
          margin-right: 4rem;
        }

        .userinfo__img {
          width: 12rem;
          height: 12rem;
          border-radius: 50%;
        }

        .userinfo__name {
          margin: 0;
        }
        .header__newpost {
          display: flex;
          flex: 1;
          align-items: center;
        }
        .header__textarea {
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

        .error {
          text-align: center;
          color: red;
        }
      </style>
      <div class="header">
        <div class="header__container">
          <div class="header__userinfo userinfo">
            <img class="userinfo__img" src="${props.avatarUrl}" alt="avatar" />
            <h5 class="userinfo__name">${props.name}</h5>
          </div>
          <div class="header__newpost">
            <textarea
              class="header__textarea"
              oninput="${this.updatePost.bind(this)}"
              value="${this.post}">
            </textarea>
            <button
              type="submit"
              class="button-primary" disabled="${props.disabled}"
              onclick="${this.postFeed.bind(this)}">
              Send
            </button>
          </div>
        </div>
        ${error}
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

  postFeed(e) {
    e.preventDefault();
    const regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    if (regex.test(this.post)) {
      this.addPost({
        name: this.name,
        imgUrl: this.avatarUrl,
        post: this.post,
        id: `${Date.now()}`
      })
      this.post = "";
      this.disabled = true;
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 2000);
    }
  }
}

customElements.define("feed-header", FeedHeader);