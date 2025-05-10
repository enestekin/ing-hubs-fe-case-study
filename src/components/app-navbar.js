import {LitElement, html, css} from 'lit';

class AppNavbar extends LitElement {
  static styles = css`
    nav {
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding: 0.5rem;
      margin: 2rem 1.3rem;
    }
    a {
      text-decoration: none;
      color: #ff9900;
    }
    div {
      display: flex;
      gap: 1rem;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/">ING</a>
        <div>
          <a href="/">Employees</a>
          <a href="/add">Add New +</a>
          <button>TR|EN</button>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-navbar', AppNavbar);
