import { LitElement, html, css } from 'lit-element';
import { defineCustomElement } from '../utils';

class ArhivedTaskList extends LitElement {
  static properties = {
    tasks: { type: Array },
  };

  constructor() {
    super();
    this.tasks = [];
  }

  _handleTaskUnarchive(task) {
    this.dispatchEvent(
      new CustomEvent('task-unarchived', {
        detail: task,
      }),
    );
  }

  _handleTaskDelete(task) {
    this.dispatchEvent(
      new CustomEvent('task-deleted', {
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
              <span class="label">${task.label}</span>
              <button @click=${() => this._handleTaskUnarchive(task)}>Unarchive</button>
              <button @click=${() => this._handleTaskDelete(task)}>Delete</button>
            </li>
          `,
        )}
      </ul>
    `;
  }
}

defineCustomElement('archived-task-list', ArhivedTaskList);
