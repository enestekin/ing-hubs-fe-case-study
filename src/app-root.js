import {LitElement, html} from 'lit';
import './views/list-view.js';

class AppRoot extends LitElement {
  render() {
    return html` <list-view></list-view> `;
  }
}

customElements.define('app-root', AppRoot);
