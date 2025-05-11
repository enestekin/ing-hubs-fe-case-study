import {LitElement, html} from 'lit';
import '../components/employee-form.js';

class AddView extends LitElement {
  render() {
    return html`<employee-form></employee-form>`;
  }
}

customElements.define('add-view', AddView);
