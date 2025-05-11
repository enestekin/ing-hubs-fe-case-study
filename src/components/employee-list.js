import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {store} from '../store/index.js';
import {deleteEmployee, setPage} from '../store/actions.js';
import {getPaginatedEmployees, getTotalPages} from '../helpers/index.js';
import './confirm-modal.js';

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

    .pagination {
      margin: 1rem 0;
      gap: 0.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .pagination button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.2rem 0.4rem;
      cursor: pointer;
    }

    .pagination .page-button.active {
      background-color: #ff9900;
      border-radius: 100%;
      color: white;
      font-weight: bold;
    }

    .pagination .nav-button.disabled {
      background-color: #eee;
      color: #aaa;
      cursor: not-allowed;
    }
  `;

  static properties = {
    employees: {type: Array},
    columns: {type: Array},
    showModal: {type: Boolean},
    selectedEmployee: {type: Object},
    totalPages: {type: Number},
    currentPage: {type: Number},
  };

  constructor() {
    super();
    this._updateState();
    this.showModal = false;
    this.selectedEmployee = null;
    this.unsubscribe = store.subscribe(() => this._updateState());
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

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe();
  }

  _updateState() {
    const state = store.getState();
    this.employees = getPaginatedEmployees(state);
    this.totalPages = getTotalPages(state);
    this.currentPage = state.currentPage;
  }

  _handleDelete(id) {
    store.dispatch(deleteEmployee(id));
  }

  _confirmDelete(employee) {
    this.selectedEmployee = employee;
    this.showModal = true;
  }

  _cancelDelete() {
    this.showModal = false;
    this.selectedEmployee = null;
  }

  _proceedDelete() {
    if (this.selectedEmployee) {
      store.dispatch(deleteEmployee(this.selectedEmployee.id));
    }
    this._cancelDelete();
  }

  goToPage(p) {
    store.dispatch(setPage(p));
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
                          @click="${() => this._confirmDelete(employee)}"
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

      <div class="pagination">
        <button
          class="nav-button ${this.currentPage === 1 ? 'disabled' : ''}"
          ?disabled=${this.currentPage === 1}
          @click=${() => this.goToPage(this.currentPage - 1)}
        >
          <iconify-icon
            icon="mdi:chevron-left"
            width="16"
            height="16"
          ></iconify-icon>
        </button>

        ${[...Array(this.totalPages)].map(
          (_, i) => html`
            <button
              class="page-button ${this.currentPage === i + 1 ? 'active' : ''}"
              @click=${() => this.goToPage(i + 1)}
            >
              ${i + 1}
            </button>
          `
        )}

        <button
          class="nav-button ${this.currentPage === this.totalPages
            ? 'disabled'
            : ''}"
          ?disabled=${this.currentPage === this.totalPages}
          @click=${() => this.goToPage(this.currentPage + 1)}
        >
          <iconify-icon
            icon="mdi:chevron-right"
            width="16"
            height="16"
          ></iconify-icon>
        </button>
      </div>

      <confirm-modal
        .open="${this.showModal}"
        .message="Selected employee record of ${this.selectedEmployee
          ? `${this.selectedEmployee.firstName} ${this.selectedEmployee.lastName} will be deleted`
          : ''}"
        @cancel="${this._cancelDelete}"
        @proceed="${this._proceedDelete}"
      ></confirm-modal>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
