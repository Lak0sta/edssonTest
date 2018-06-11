import { LitElement, html } from "@polymer/lit-element/lit-element.js";
import * as Api from "../../services/api.js";
import "./feed-header.js";
import "./feed-item.js";

class FeedPage extends LitElement {
  static get properties() {
    return {
      feeds: Array,
      name: String,
      avatarUrl: String,
      disabled: Boolean
    }
  }

  constructor() {
    super();
    this.feeds = [];
    this.name = "Andrew Thomas";
    this.avatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2JRlLRMiucrN_0tdPEcrtdJZtJD47yxCzeYNgtcdWBE31UMJJ5w";
    this.disabled = false;
  }

  _firstRendered() {
    Api.fetchPosts().then(response => {
      this.feeds = response.results;
      this.feeds.map((el) => {
        el.id = el.login.salt
      });
      // console.log(this.feeds)
      // setTimeout(() => {
      //   console.log(this.feeds)
      // }, 2000);
    });
  }

  addFeed(feed) {
    return Api.addFeed(feed).then(resp => {
      this.feeds = [resp].concat(this.feeds);
      this.fire("popup-show", `User ${resp.name} posted a message: ${resp.post}`);
    });
  }

  editFeed(feed) {
    return Api.editFeed(feed).then(resp => {
      const newFeeds = this.feeds.slice();
      const editedId = newFeeds.findIndex(entry => entry.id === feed.id);
      newFeeds[editedId] = feed;
      this.feeds = newFeeds;
    });
  }

  removePost(id) {
    const feeds = [ ...this.feeds ];
    const newFeeds = feeds.reduce((acc, el) => {
      if (el.id === id) {
        el = null;
      }
      acc.push(el);
      return acc;
    }, []);
    this.feeds = [...newFeeds];
    this.removeNull(this.feeds);
  }

  removeNull(arr) {
    const index = arr.indexOf(null);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  _render(props) {
    const feeds = props.feeds.map(feed => {
    return html`
      <li>
        <feed-item
          uId="${feed.id}"
          name="${feed.name.first}"
          avatarUrl="${feed.picture.medium}"
          post="${feed.login.username}"
          editFeed="${this.editFeed.bind(this)}"
          removeFeed="${this.removePost.bind(this)}">
        </feed-item>
      </li>
    `;
    });

    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        .Feeds__container {
          padding: 2rem 3rem 0;
          list-style: none;
        }
      </style>
      <div class="container">
        <feed-header
          name="${props.name}"
          avatarUrl="${props.avatarUrl}"
          addFeed="${this.addFeed.bind(this)}">
        </feed-header>
        <ul class="Feeds__container">${feeds}</ul>
      </div>
    `;
  }

  fire(name, detail) {
    return this.dispatchEvent(new CustomEvent(name, {
      composed: true,
      bubbles: true,
      detail
    }));
  }
}

customElements.define("feed-page", FeedPage);