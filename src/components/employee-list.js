import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {store} from '../store/index.js';
import {
  deleteEmployee,
  setPage,
  setViewMode,
  setSearchQuery,
} from '../store/actions.js';
import {getPaginatedEmployees, getTotalPages} from '../helpers/index.js';
import './confirm-modal.js';

class EmployeeList extends LitElement {
  static styles = css`
    .employee-list__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 3rem;
    }
    .employee-list__table {
      background-color: #fff;
      border-radius: 5px;
      margin: 0 3rem;
    }

    h3 {
      color: #ff9900;
      font-weight: 500;
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

    .employee-list__table--header {
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

    .card-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin: 1rem 3rem;
    }

    .card {
      display: flex;
      gap: 5px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      p {
        margin: 0;
      }
    }

    .card-grid__buttons {
      margin-top: 1rem;
    }

    @media (min-width: 600px) {
      .card-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 900px) {
      .card-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `;

  static properties = {
    employees: {type: Array},
    columns: {type: Array},
    showModal: {type: Boolean},
    selectedEmployee: {type: Object},
    totalPages: {type: Number},
    currentPage: {type: Number},
    viewMode: {type: String},
  };

  constructor() {
    super();
    this._updateState();
    this.showModal = false;
    this.selectedEmployee = null;
    this.viewMode = 'table';
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
    this.viewMode = state.viewMode;
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

  handleSearch(e) {
    store.dispatch(setSearchQuery(e.target.value));
  }

  renderTableView() {
    return html`
      <div class="employee-list__table">
        <table>
          <thead>
            <tr class="employee-list__table--header">
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
                        <button @click="${() => this._confirmDelete(employee)}">
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

  renderListView() {
    return html`
      <div class="card-grid">
        ${this.employees.map(
          (employee) => html`
            <div class="card">
              <p><strong>${employee.firstName} ${employee.lastName}</strong></p>
              <p>Phone: ${employee.phone}</p>
              <p>Email: ${employee.email}</p>
              <p>Departmant: ${employee.department}</p>
              <p>Position: ${employee.position}</p>
              <p>Date of Employment: ${employee.dateOfEmployment}</p>
              <p>Date of Birth: ${employee.dateOfBirth}</p>
              <div class="card-grid___buttons">
                <button>
                  <iconify-icon
                    icon="mdi:pencil"
                    width="20"
                    height="20"
                  ></iconify-icon>
                </button>
                <button @click="${() => this._confirmDelete(employee)}">
                  <iconify-icon
                    icon="mdi:delete"
                    width="20"
                    height="20"
                  ></iconify-icon>
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      <div class="employee-list__header">
        <h3>Employee List</h3>
        <div class="">
          <input
            type="text"
            placeholder="Search..."
            @input=${this.handleSearch}
          />
          <button
            @click=${() => store.dispatch(setViewMode('table'))}
            ?selected=${this.viewMode === 'table'}
          >
            <iconify-icon
              icon="mdi:view-list"
              width="20"
              height="20"
            ></iconify-icon>
          </button>
          <button
            @click=${() => store.dispatch(setViewMode('list'))}
            ?selected=${this.viewMode === 'list'}
          >
            <iconify-icon
              icon="mdi:view-grid"
              width="20"
              height="20"
            ></iconify-icon>
          </button>
        </div>
      </div>
      ${this.viewMode === 'table'
        ? this.renderTableView()
        : this.renderListView()}

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
