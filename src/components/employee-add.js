import {LitElement, html} from 'lit';

class EmployeeAdd extends LitElement {
  render() {
    return html` <div>add employee component</div> `;
  }
}

customElements.define('employee-add', EmployeeAdd);
