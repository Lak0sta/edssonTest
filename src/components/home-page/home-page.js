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
          padding-top: 10vmin;
        }
      </style>
      <div>
        <h3>Welcome!</h3>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);