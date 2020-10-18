import { LitElement, html, css } from 'lit-element';
import { withBasicStyles } from '../mixins';
import { button, item, ul } from '../styles';
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

  .danger {
    background-color: #f3d7d7;
    color: #a02323;
  }

  .danger:hover {
    background-color: #eabbbb;
  }

  .label {
    flex: 1;
  }
`;

defineCustomElement('archived-task-list', withBasicStyles(ArhivedTaskList));
