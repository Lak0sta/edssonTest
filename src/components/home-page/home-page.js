import { LitElement, html } from "@polymer/lit-element/lit-element.js";

class HomePage extends LitElement {
  _render(props) {
    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";

        .container {
          max-width: 960px;
          margin: 0 auto;
        }

        div {
          display: flex;
          justify-content: center;
          padding-top: 10vh;
        }
      </style>
      <div class="container">
        <h3>Welcome to the home page!</h3>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);