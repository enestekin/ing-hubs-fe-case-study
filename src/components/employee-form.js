import {LitElement, html, css} from 'lit';
import {store} from '../store/index.js';
import {addEmployee, updateEmployee} from '../store/actions.js';
import {validateEmployee} from '../helpers/index.js';
import {Router} from '@vaadin/router';
import '../components/confirm-modal.js';

class EmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
    isEdit: {type: Boolean},
  };

  static styles = css`
    div {
      padding: 0 3rem 1rem;
      font-size: 13px;
    }

    h3 {
      color: #ff9900;
      font-weight: 500;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 7px;
      max-width: 400px;
      padding: 0 1rem;
      margin: 0 auto;
    }
    label {
      font-weight: bold;
    }

    button {
      padding: 0.5rem;
      cursor: pointer;
    }

    @media (min-width: 900px) {
      div {
        font-size: 1rem;
      }
      form {
        gap: 1rem;
      }
      input,
      select {
        padding: 0.5rem;
        font-size: 1rem;
      }
    }
  `;

  constructor() {
    super();
    this.employee = {};
    this.isEdit = false;
    this.showModal = false;
  }

  _handleInput(e) {
    this.employee = {
      ...this.employee,
      [e.target.name]: e.target.value,
    };
  }

  _handleSubmit(e) {
    e.preventDefault();

    if (this.isEdit) {
      this.showModal = true;
      this.requestUpdate();
    } else {
      const errors = validateEmployee(
        this.employee,
        store.getState().employees
      );
      if (errors.length) {
        alert(errors.join('\n'));
        return;
      }
      const id = Date.now().toString();
      store.dispatch(addEmployee({...this.employee, id}));
      Router.go('/');
    }
  }

  render() {
    const emp = this.employee;
    return html`
      <div>
        <h3>${this.isEdit ? 'Edit' : 'Add'} Employee</h3>

        <form @submit="${this._handleSubmit}">
          <label>First Name</label>
          <input
            name="firstName"
            .value=${emp.firstName || ''}
            @input=${this._handleInput}
            required
          />

          <label>Last Name</label>
          <input
            name="lastName"
            .value=${emp.lastName || ''}
            @input=${this._handleInput}
            required
          />

          <label>Date of Employment</label>
          <input
            type="date"
            name="dateOfEmployment"
            .value=${emp.dateOfEmployment || ''}
            @input=${this._handleInput}
            required
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            .value=${emp.dateOfBirth || ''}
            @input=${this._handleInput}
            required
          />

          <label>Phone</label>
          <input
            name="phone"
            .value=${emp.phone || ''}
            @input=${this._handleInput}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            .value=${emp.email || ''}
            @input=${this._handleInput}
            required
          />

          <label>Department</label>
          <select
            name="department"
            .value=${emp.department || ''}
            @change=${this._handleInput}
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
            @change=${this._handleInput}
            required
          >
            <option value="">Select</option>
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>

          <button>${this.isEdit ? 'Update' : 'Create'} Employee</button>
        </form>
      </div>

      <confirm-modal
        .open=${this.showModal}
        .message="Selected employee record of ${this.employee
          ? `${this.employee.firstName} ${this.employee.lastName} will be edited`
          : ''}"
        @cancel=${() => {
          this.showModal = false;
          this.requestUpdate();
        }}
        @proceed=${() => {
          store.dispatch(updateEmployee(this.employee));
          Router.go('/');
        }}
      ></confirm-modal>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
