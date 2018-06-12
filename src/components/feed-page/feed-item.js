import { LitElement, html } from "@polymer/lit-element/lit-element.js";

class FeedItem extends LitElement {
  static get properties() {
    return {
      uId: String,
      name: String,
      imgUrl: String,
      post: String,
      disabled: Boolean,
      editFeed: Function,
      removeFeed: Function
    }
  }

  _render(props) {
    // console.log(props.uId);
    let postView;
    
    postView = html`
      <input
        type="text"
        value="${props.post}"
        class="Feed__post"
        disabled="${this.disabled}"
        onblur="${this.postChanged.bind(this)}"
        onchange="${this.postChanged.bind(this)}"
        on-click="${this.startEditing.bind(this)}"/>
    `;
    
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
        <img src="${props.imgUrl}" />
        <b>${props.name}</b>
        ${postView}
        <span class="Feed__icon" on-click="${this.startEditing.bind(this)}">&#9998;</span>
        <span class="Feed__icon" on-click="${() => props.removeFeed(props.uId)}">&#10539;</span>
      </div>
    `;
  }
  
  startEditing() {
    this.disabled = false;
    this.renderComplete.then(() => this._root.querySelector("input").focus());
  }

  postChanged(e) {
    // console.log(e.currentTarget.value);
    const newFeed = {
      id: this.uId,
      name: this.name,
      imgUrl: this.imgUrl,
      post: e.path[0].value
    }
    // console.log(newFeed);
    this.disabled = true;
    this.editPost(newFeed);
  }
}

customElements.define("feed-item", FeedItem);