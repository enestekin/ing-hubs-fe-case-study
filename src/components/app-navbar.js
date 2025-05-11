import {LitElement, html, css} from 'lit';
import {store} from '../store/index.js';
import {setLanguage} from '../store/actions.js';
import {i18n} from '../locales/index.js';

class AppNavbar extends LitElement {
  static properties = {
    viewMode: {type: String},
  };

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

      button {
        border: none;
        background-color: #fff;
        cursor: pointer;
      }
  `;

  constructor() {
    super();
    const state = store.getState();
    this.viewMode = state.viewMode;
    this.lang = state.language;

    store.subscribe(() => {
      const state = store.getState();
      this.viewMode = state.viewMode;
      this.lang = state.language;
      this.requestUpdate();
    });
  }

  toggleLang() {
    const newLang = this.lang === 'en' ? 'tr' : 'en';
    store.dispatch(setLanguage(newLang));
  }

  render() {
    const t = i18n[this.lang];

    return html`
      <header>
        <p>
          ${t.employeeList} (${this.viewMode === 'table' ? t.table : t.list}
          ${t.viewLabel})
        </p>
        <nav>
          <a href="/">${t.company}</a>
          <div>
            <a href="/">${t.employees}</a>
            <a href="/add">${t.addNew}</a>
            <button @click=${this.toggleLang}>
              <iconify-icon
                icon="${this.lang === 'en'
                  ? 'twemoji:flag-united-kingdom'
                  : 'twemoji:flag-turkey'}"
                width="24"
                height="24"
              ></iconify-icon>
            </button>
          </div>
        </nav>
      </header>
    `;
  }
}

customElements.define('app-navbar', AppNavbar);
