import {LitElement, html} from 'lit';
import {store} from './store';
import {selectEmployees} from './store/selectors';

class AppRoot extends LitElement {
  static properties = {
    employees: {type: Array},
  };

  constructor() {
    super();
    this.employees = selectEmployees(store.getState());
  }

  render() {
    return html`
      <div>
        <ul>
          ${this.employees.map(
            (employee) => html`
              <li>
                ${employee.id} - ${employee.firstName} - ${employee.position}
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);
