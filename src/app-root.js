import {html, LitElement} from 'lit';
import './router.js';
import './components/app-navbar.js';

class AppRoot extends LitElement {
  render() {
    return html`
      <app-navbar></app-navbar>
      <main>
        <router-outlet></router-outlet>
      </main>
    `;
  }
}

customElements.define('app-root', AppRoot);
