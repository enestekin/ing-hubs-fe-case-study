import {LitElement, html} from 'lit';
import {selectEmployees} from '../store/selectors.js';
import {store} from '../store';
import '../components/employee-list.js';

class ListView extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    selectEmployees(store.getState());
  }

  render() {
    return html`
      <div>
        <employee-list></employee-list>
      </div>
    `;
  }
}

customElements.define('list-view', ListView);
