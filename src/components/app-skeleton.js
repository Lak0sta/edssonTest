import { html } from "@polymer/lit-element/lit-element.js";
import routerView from "../router/router-view.js";

export default route => html`
  <style>
    header {
      border-bottom: 1px solid lightgray;
    }
    ul {
      display: flex;
      list-style: none;
      margin-bottom: 0;
    }
    li {
      margin: 1.5rem 1rem;
    }
  </style>
  <header>
    <ul class="container">
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/feed">Feed</a>
      </li>
    </ul>
  </header>
  <main>
    ${routerView(route)}
  </main>
`;