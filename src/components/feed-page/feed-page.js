import { LitElement, html } from "@polymer/lit-element/lit-element.js";
import * as Api from "../../services/api.js";
import "./feed-header.js";
import "./feed-item.js";
import "../spinner/spinner.js";

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
      this.setPostsStructure(this.feeds);
    });
  }

  _render(props) {
    let postsList;
    if (this.feeds.length > 0) {
      postsList = props.feeds.map(feed => {
        return html`
          <li>
            <feed-item
              uId="${feed.id}"
              name="${feed.name}"
              imgUrl="${feed.imgUrl}"
              post="${feed.post}"
              editPost="${this.editPost.bind(this)}"
              removeFeed="${this.removePost.bind(this)}"
              disabled="${true}"
            >
            </feed-item>
          </li>
        `;
        });
    } else {
      postsList = html`<spinner-element></spinner-element>`
    }

    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        .feeds__container {
          padding: 2rem 3rem 0;
          list-style: none;
        }
      </style>
      <div class="container">
        <feed-header
          name="${props.name}"
          avatarUrl="${props.avatarUrl}"
          addPost="${this.addPost.bind(this)}">
        </feed-header>
        <ul class="feeds__container">${postsList}</ul>
      </div>
    `;
  }

  setPostsStructure(unstructuredPosts) {
    unstructuredPosts.map((el) => {
      // making an unique id for every post
      el.id = el.login.salt
      // making a one name field form existing data
      el.name = `${el.name.title}. ${el.name.first} ${el.name.last}`
      // making a post field for better comfort working with data
      el.post = `Hello look at post ${el.login.username} ${el.picture.thumbnail}`
      el.imgUrl = `${el.picture.medium}`
      // delete unncesesary fields
      delete el.login
      delete el.picture
    });
  }

  addPost(feed) {
    const feeds = [ ...this.feeds ];
    const newFeeds = [feed].concat(feeds);
    this.feeds = [...newFeeds];
    this.fire("popup-show", `User ${feed.name} posted a message: ${feed.post}`);
  }

  editPost(feed) {
    const feeds = [ ...this.feeds ];
    const newFeeds = feeds.reduce((acc, el) => {
      if (el.id === feed.id) {
        el.post = feed.post;
      }
      acc.push(el);
      return acc;
    }, []);
    this.feeds = [...newFeeds];
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

  // function helper

  removeNull(arr) {
    const index = arr.indexOf(null);
    if (index > -1) {
      arr.splice(index, 1);
    }
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