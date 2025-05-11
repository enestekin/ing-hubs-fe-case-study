import {LitElement, html, css} from 'lit';
import {i18n} from '../locales/index.js';
import {store} from '../store/index.js';

class ConfirmModal extends LitElement {
  static styles = css`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      padding: 0.7rem;
      max-width: 500px;
      width: 90%;
      position: relative;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .modal h2 {
      color: #ff9900;
      margin: 0;
    }

    .modal-buttons {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .proceed {
      background-color: #ff9900;
      color: white;
    }

    .cancel {
      background-color: #fff;
      border: 1px solid #000;
    }

    .close-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #ff9900;
    }
  `;

  static properties = {
    open: {type: Boolean},
    message: {type: String},
  };

  constructor() {
    super();
    this.open = false;
    this.message = '';
    this.lang = store.getState().language;

    store.subscribe(() => {
      const state = store.getState();
      if (this.lang !== state.language) {
        this.lang = state.language;
        this.requestUpdate();
      }
    });
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  _handleProceed() {
    this.dispatchEvent(new CustomEvent('proceed'));
  }

  render() {
    const t = i18n[this.lang];
    const dynamicMessage =
      this.message ||
      t.deleteConfirmationMessage(this.firstName, this.lastName);

    if (!this.open) return html``;
    return html`
      <div class="modal-overlay">
        <div class="modal">
          <button class="close-button" @click="${this._handleCancel}">
            &times;
          </button>
          <h2>${t.areYouSure}</h2>
          <p>${dynamicMessage}</p>
          <div class="modal-buttons">
            <button class="proceed" @click="${this._handleProceed}">
              ${t.proceed}
            </button>
            <button class="cancel" @click="${this._handleCancel}">
              ${t.cancel}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-modal', ConfirmModal);
