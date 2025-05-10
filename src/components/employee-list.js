import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {store} from '../store/index.js';
import {deleteEmployee} from '../store/actions.js';

class EmployeeList extends LitElement {
  static styles = css`
    .employee-list-container {
      background-color: #fff;
      border-radius: 5px;
      margin: 0 3rem;
    }

    h3 {
      color: #ff9900;
      font-weight: 500;
      padding-left: 3rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-weight: normal;
    }

    tbody tr:last-child td,
    tbody tr:only-child td {
      border-bottom: none;
    }

    .employee-list-container__header {
      color: #ff9900;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: #ff9900;
    }
  `;

  static properties = {
    employees: {type: Array},
    columns: {type: Array},
  };

  constructor() {
    super();
    this.columns = [
      {key: 'firstName', label: 'Adı'},
      {key: 'lastName', label: 'Soyadı'},
      {key: 'dateOfEmployment', label: 'İşe Giriş Tarihi'},
      {key: 'dateOfBirth', label: 'Doğum Tarihi'},
      {key: 'phone', label: 'Telefon'},
      {key: 'email', label: 'E-posta'},
      {key: 'department', label: 'Departman'},
      {key: 'position', label: 'Pozisyon'},
      {key: 'actions', label: 'İşlemler'},
    ];
  }

  _handleDelete(id) {
    store.dispatch(deleteEmployee(id));
  }

  render() {
    return html`
      <h3>Employee List</h3>
      <div class="employee-list-container">
        <table>
          <thead>
            <tr class="employee-list-container__header">
              ${this.columns.map((column) => html`<th>${column.label}</th>`)}
            </tr>
            <tr></tr>
          </thead>

          <tbody>
            ${this.employees.length > 0
              ? repeat(
                  this.employees,
                  (employee) => employee.id,
                  (employee) => html`
                    <tr>
                      ${this.columns
                        .filter((column) => column.key !== 'actions')
                        .map(
                          (column) => html`
                            <td>${employee[column.key] || ''}</td>
                          `
                        )}
                      <td>
                        <button title="Düzenle">
                          <iconify-icon
                            icon="mdi:pencil"
                            width="20"
                            height="20"
                          ></iconify-icon>
                        </button>
                        <button
                          title="Sil"
                          @click="${() => this._handleDelete(employee.id)}"
                        >
                          <iconify-icon
                            icon="mdi:delete"
                            width="20"
                            height="20"
                          ></iconify-icon>
                        </button>
                      </td>
                    </tr>
                  `
                )
              : html`
                  <tr>
                    <td colspan="${this.columns.length}">
                      Çalışan bulunamadı.
                    </td>
                  </tr>
                `}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
