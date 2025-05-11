import {LitElement, html, css} from 'lit';
import {store} from '../store/index.js';

class AppNavbar extends LitElement {
  static properties = {
    viewMode: {type: String},
  };

  constructor() {
    super();
    this.viewMode = store.getState().viewMode;
    store.subscribe(() => {
      this.viewMode = store.getState().viewMode;
    });
  }

  static styles = css`
    header {
      margin: 2rem 1.3rem;
      p {
        color: #9f9898;
        font-size: 10px;
        font-weight: 500;
      }
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 0.5rem;
      font-size: 13px;
    }
    a {
      text-decoration: none;
      color: #ff9900;
    }
    div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    @media (min-width: 900px) {
      nav {
        font-size: 1rem;
      }
  `;

  render() {
    return html`
      <header>
        <p>
          Employee List (${this.viewMode === 'table' ? 'Table' : 'List'} View)
        </p>
        <nav>
          <a href="/">ING</a>
          <div>
            <a href="/">Employees</a>
            <a href="/add">+ Add New</a>
            <button>TR|EN</button>
          </div>
        </nav>
      </header>
    `;
  }
}

customElements.define('app-navbar', AppNavbar);
