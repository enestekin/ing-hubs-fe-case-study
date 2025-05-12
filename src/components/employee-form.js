import {LitElement, html, css} from 'lit';
import {store} from '../store/index.js';
import {addEmployee, updateEmployee} from '../store/actions.js';
import {validateEmployee} from '../helpers/index.js';
import {Router} from '@vaadin/router';
import '../components/confirm-modal.js';
import {i18n} from '../locales/index.js';

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

    this.lang = store.getState().language;

    store.subscribe(() => {
      const state = store.getState();
      if (this.lang !== state.language) {
        this.lang = state.language;
        this.requestUpdate();
      }
    });
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
    const t = i18n[this.lang];
    const emp = this.employee;
    return html`
      <div>
        <h3>${this.isEdit ? t.editEmployee : t.addEmployee}</h3>

        <form @submit="${this._handleSubmit}">
          <label>${t.firstName}</label>
          <input
            name="firstName"
            .value=${emp.firstName || ''}
            @input=${this._handleInput}
            required
          />

          <label>${t.lastName}</label>
          <input
            name="lastName"
            .value=${emp.lastName || ''}
            @input=${this._handleInput}
            required
          />

          <label>${t.dateOfEmployment}</label>
          <input
            type="date"
            name="dateOfEmployment"
            .value=${emp.dateOfEmployment || ''}
            @input=${this._handleInput}
            required
          />

          <label>${t.dateOfBirth}</label>
          <input
            type="date"
            name="dateOfBirth"
            .value=${emp.dateOfBirth || ''}
            @input=${this._handleInput}
            required
          />

          <label>${t.phone}</label>
          <input
            name="phone"
            .value=${emp.phone || ''}
            @input=${this._handleInput}
            required
          />

          <label>${t.email}</label>
          <input
            type="email"
            name="email"
            .value=${emp.email || ''}
            @input=${this._handleInput}
            required
          />

          <label>${t.department}</label>
          <select
            name="department"
            .value=${emp.department || ''}
            @change=${this._handleInput}
            required
          >
            <option value="">${t.select}</option>
            <option value="Analytics">${t.analytics}</option>
            <option value="Tech">${t.tech}</option>
          </select>

          <label>${t.position}</label>
          <select
            name="position"
            .value=${emp.position || ''}
            @change=${this._handleInput}
            required
          >
            <option value="">${t.select}</option>
            <option value="Junior">${t.junior}</option>
            <option value="Medior">${t.medior}</option>
            <option value="Senior">${t.senior}</option>
          </select>

          <button>${t.save}</button>
        </form>
      </div>

      <confirm-modal
        .open=${this.showModal}
        .message=${t.editConfirmationMessage(
          this.employee.firstName,
          this.employee.lastName
        )}
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
