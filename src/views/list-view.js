import {LitElement, html} from 'lit';
import {selectEmployees} from '../store/selectors.js';
import {store} from '../store';
import '../components/employee-list.js';

class ListView extends LitElement {
  static properties = {
    employees: {type: Array},
  };

  constructor() {
    super();
    this.employees = selectEmployees(store.getState());
    this.unsubscribe = store.subscribe(() => {
      this.employees = selectEmployees(store.getState());
    });
  }

  render() {
    return html`
      <div>
        <employee-list .employees="${this.employees}"></employee-list>
      </div>
    `;
  }
}

customElements.define('list-view', ListView);
