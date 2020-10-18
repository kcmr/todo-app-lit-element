import { LitElement, html, css } from 'lit-element';
import { withBasicStyles } from '../mixins';
import { actionBar, button, item, ul } from '../styles';
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

  _handleDeleteAll() {
    this.dispatchEvent(new Event('task-list-deleted'));
  }

  render() {
    if (this.tasks.length === 0) {
      return null;
    }

    return html`
      <div class="action-bar">
        <h2 class="title">Archived tasks</h2>
        <button class="danger" @click=${this._handleDeleteAll}>Delete all</button>
      </div>

      <ul>
        ${this.tasks.map(
          (task) => html`
            <li class="item">
              <span class="label">${task.label}</span>
              <button @click=${() => this._handleTaskUnarchive(task)}>Unarchive</button>
              <button class="danger" @click=${() => this._handleTaskDelete(task)}>
                Delete
              </button>
            </li>
          `,
        )}
      </ul>
    `;
  }
}

ArhivedTaskList.styles = css`
  ${ul()}
  ${item}
  ${button(css`
    margin-left: 0.5rem;
  `)}
  ${actionBar}

  .label {
    flex: 1;
  }
`;

defineCustomElement('archived-task-list', withBasicStyles(ArhivedTaskList));
