import { html } from "@polymer/lit-element/lit-element.js";
import "../components/home-page/home-page.js";
import "../components/feed-page/feed-page.js";

export default new Map([
  ["/", html`<home-page></home-page>`],
  ["/home", html`<home-page></home-page>`],
  ["/feed", html`<feed-page></feed-page>`]
]);