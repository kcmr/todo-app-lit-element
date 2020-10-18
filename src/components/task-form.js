import { LitElement, html, css } from 'lit-element';
import { withBasicStyles } from '../mixins';
import { defineCustomElement } from '../utils';

class TaskForm extends LitElement {
  static properties = {
    _value: { type: String },
  };

  constructor() {
    super();
    this._value = '';
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent('task-added', {
        detail: this._value,
      }),
    );

    this._clearInput();
  }

  _handleInputChange({ target: input }) {
    this._value = input.value;
  }

  _clearInput() {
    this._value = '';
  }

  render() {
    return html`
      <form @submit=${this._handleFormSubmit}>
        <label for="input">What needs to be done?</label>
        <input
          autofocus
          autocomplete="off"
          id="input"
          type="text"
          name="task"
          .value=${this._value}
          @input=${this._handleInputChange}
          placeholder="Type and press enter"
        />
      </form>
    `;
  }
}

TaskForm.styles = css`
  label {
    font-size: 20px;
    font-weight: 500;
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    font: inherit;
    font-size: 0.9375rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  input:focus {
    border-color: dodgerblue;
    outline: none;
    box-shadow: inset rgba(0, 0, 0, 0.5) 0 2px 3px -2px;
  }
`;

defineCustomElement('task-form', withBasicStyles(TaskForm));
