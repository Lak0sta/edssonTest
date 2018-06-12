import { html } from "@polymer/lit-element/lit-element.js";
import routerView from "../router/router-view.js";

export default route => html`
  <style>
    .tabs {
      display: flex;
    }

    li {
      list-style-type: none;
      margin-top: 10px;
    }

    .tabs__item {
      background: white;
      border-radius: 10px 10px 0 0;
      border: 1px solid black;
      padding: 10px 40px;
      width: 150px;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
    }
  </style>
  <header>
    <ul class="container tabs">
      <li>
        <a class="tabs__item" href="/home">Home</a>
      </li>
      <li>
        <a class="tabs__item" href="/feed">Feed</a>
      </li>
    </ul>
  </header>
  <main>
    ${routerView(route)}
  </main>
`;