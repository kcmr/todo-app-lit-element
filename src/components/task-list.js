import { LitElement, html, css } from 'lit-element';
import { defineCustomElement } from '../utils';

class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array },
  };

  constructor() {
    super();
    this.tasks = [];
  }

  _handleCheckboxChange(task) {
    this.dispatchEvent(
      new CustomEvent('task-status-changed', {
        detail: task,
      }),
    );
  }

  _handleArchiveButtonClick(task) {
    this.dispatchEvent(
      new CustomEvent('task-archived', {
        detail: task,
      }),
    );
  }

  render() {
    if (this.tasks.length === 0) {
      return null;
    }

    return html`
      <ul>
        ${this.tasks.map(
          (task) => html`
            <li class="item">
              <label for=${task.id}>
                <input
                  id=${task.id}
                  type="checkbox"
                  ?checked=${task.completed}
                  @change=${() => this._handleCheckboxChange(task)}
                />
                <span class="label">${task.label}</span>
              </label>
              <button @click=${() => this._handleArchiveButtonClick(task)}>
                Archive
              </button>
            </li>
          `,
        )}
      </ul>
    `;
  }
}

defineCustomElement('task-list', TaskList);
