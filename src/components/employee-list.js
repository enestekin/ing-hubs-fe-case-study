import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';

class EmployeeList extends LitElement {
  static styles = css`
    h3 {
      color: #ff9900;
    }

    .employee-list-container {
      padding: 3rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-weight: normal;
    }

    .employee-list-container__header {
      color: #ff9900;
    }

    button {
      cursor: pointer;
      margin-right: 5px;
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

  render() {
    return html`
      <div class="employee-list-container">
        <h3>Employee List</h3>

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
                        <button>Düzenle</button>
                        <button>Sil</button>
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
