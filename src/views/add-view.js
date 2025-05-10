import {LitElement, html} from 'lit';
import '../components/employee-add.js';

class AddView extends LitElement {
  render() {
    return html`<employee-add></employee-add>`;
  }
}

customElements.define('add-view', AddView);
