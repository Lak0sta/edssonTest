import { LitElement, html } from "@polymer/lit-element/lit-element.js";
import { installRouter } from "pwa-helpers/router.js";
import appSkeleton from "./components/app-skeleton.js";
import "./components/popup-window/popup-window.js";

class AppRoot extends LitElement {
  static get properties() {
    return {
      route: String
    }
  }

  _firstRendered() {
    installRouter(location => {
      this.route = location.pathname;
    });
    this.$popup = this._root.querySelector("popup-window");
  }

  constructor() {
    super();
    this.addEventListener("popup-show", this.showPopupHandler.bind(this));
  }
  
  showPopupHandler(e) {
    const message = e.detail
    this.$popup.show(message);
  }

  _render(props) {
    return html`
      <style>
        @import "../../node_modules/skeleton-css/css/normalize.css";
        @import "../../node_modules/skeleton-css/css/skeleton.css";
      </style>
      ${appSkeleton(props.route)}
      <popup-window></popup-window>
    `
  }
}

customElements.define("app-root", AppRoot);