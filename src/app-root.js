import {LitElement, html, css} from 'lit';

class AppRoot extends LitElement {
  static styles = css``;

  render() {
    return html` <main>TEST</main> `;
  }
}

customElements.define('app-root', AppRoot);
