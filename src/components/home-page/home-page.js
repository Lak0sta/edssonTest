import { LitElement, html } from "@polymer/lit-element/lit-element.js";

class HomePage extends LitElement {
  _render(props) {
    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";
        div {
          display: flex;
          justify-content: center;
          padding-top: 10vh;
        }
      </style>
      <div>
        <h3>Welcome to the home page!</h3>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);