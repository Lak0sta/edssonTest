import { LitElement, html } from "@polymer/lit-element/lit-element.js";

class FeedItem extends LitElement {
  static get properties() {
    return {
      uId: String,
      name: String,
      avatarUrl: String,
      post: String,
      editing: Boolean,
      editFeed: Function,
      removeFeed: Function
    }
  }

  _render(props) {
    // console.log(props.uId);
    let postView;
    if (this.editing) {
      postView = html`
        <input
          type="text"
          value="${props.post}"
          class="Feed__post"
          onblur="${this.postChanged.bind(this)}"
          onchange="${this.postChanged.bind(this)}"/>
      `;
    } else {
      postView = html`<span class="Feed__post">${props.post}</span>`
    }
    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        div {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        img {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          margin-right: 2rem;
        }
        b {
          width: 16rem;
          margin-right: 4rem;
        }
        .Feed__post {
          flex: 1;
          margin-right: 2rem;
          margin-bottom: 0;
        }
        .Feed__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          font-size: 2rem;
          margin-left: 2rem;
          cursor: pointer;
        }
      </style>
      <div>
        <img src="${props.avatarUrl}" />
        <b>${props.name}</b>
        ${postView}
        <span class="Feed__icon" on-click="${this.startEditing.bind(this)}">&#9998;</span>
        <span class="Feed__icon" on-click="${() => props.removeFeed(props.uId)}">&#10539;</span>
      </div>
    `;
  }
  
  startEditing() {
    this.editing = true;
    this.renderComplete.then(() => this._root.querySelector("input").focus());
  }

  postChanged(e) {
    const newFeed = {
      id: this.uId,
      name: this.name,
      avatarUrl: this.avatarUrl,
      post: e.path[0].value
    }
    this.editing = false;
    this.editFeed(newFeed);
  }
}

customElements.define("feed-item", FeedItem);