import {LitElement, html} from 'lit';
import '../components/employee-form.js';
import {store} from '../store';

class EditView extends LitElement {
  static properties = {
    employeeId: {type: String},
  };

  constructor() {
    super();
    this.employeeId = null;
  }

  onBeforeEnter(location) {
    this.employeeId = location.params.id;
  }

  render() {
    const employee = store
      .getState()
      .employees.find((e) => e.id === this.employeeId);

    if (!employee) return html`<p>Employee not found.</p>`;

    return html`<employee-form
      .employee=${employee}
      .isEdit=${true}
    ></employee-form>`;
  }
}

customElements.define('edit-view', EditView);
