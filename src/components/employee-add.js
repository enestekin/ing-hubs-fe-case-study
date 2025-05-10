import {LitElement, html, css} from 'lit';
import {store} from '../store/index.js';
import {addEmployee} from '../store/actions.js';
import {Router} from '@vaadin/router';

class EmployeeAdd extends LitElement {
  static properties = {
    employee: {type: Object},
    isEdit: {type: Boolean},
  };

  static styles = css`
    div {
      padding: 0 3rem;
    }

    h3 {
      color: #ff9900;
      font-weight: 500;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
      padding-top: 1rem;
    }
    label {
      font-weight: bold;
    }
    input,
    select {
      padding: 0.5rem;
      font-size: 1rem;
    }
    button {
      padding: 0.5rem;
    }
  `;

  constructor() {
    super();
    this.employee = {};
  }

  handleInput(e) {
    this.employee = {
      ...this.employee,
      [e.target.name]: e.target.value,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const id = Date.now().toString();
    store.dispatch(addEmployee({...this.employee, id}));
    Router.go('/');
  }

  render() {
    const emp = this.employee;
    return html`
      <div>
        <h3>Add Employee</h3>

        <form @submit="${this.handleSubmit}">
          <label>First Name</label>
          <input
            name="firstName"
            .value=${emp.firstName || ''}
            @input=${this.handleInput}
            required
          />

          <label>Last Name</label>
          <input
            name="lastName"
            .value=${emp.lastName || ''}
            @input=${this.handleInput}
            required
          />

          <label>Date of Employment</label>
          <input
            type="date"
            name="dateOfEmployment"
            .value=${emp.dateOfEmployment || ''}
            @input=${this.handleInput}
            required
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            .value=${emp.dateOfBirth || ''}
            @input=${this.handleInput}
            required
          />

          <label>Phone</label>
          <input
            name="phone"
            .value=${emp.phone || ''}
            @input=${this.handleInput}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            .value=${emp.email || ''}
            @input=${this.handleInput}
            required
          />

          <label>Department</label>
          <select
            name="department"
            .value=${emp.department || ''}
            @change=${this.handleInput}
            required
          >
            <option value="">Select</option>
            <option value="Analytics">Analytics</option>
            <option value="Tech">Tech</option>
          </select>

          <label>Position</label>
          <select
            name="position"
            .value=${emp.position || ''}
            @change=${this.handleInput}
            required
          >
            <option value="">Select</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>

          <button type="submit">Add Employee</button>
        </form>
      </div>
    `;
  }
}

customElements.define('employee-add', EmployeeAdd);
