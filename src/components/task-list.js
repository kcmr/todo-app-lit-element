import { LitElement, html, css } from 'lit-element';
import { withBasicStyles } from '../mixins';
import { actionBar, button, item, ul } from '../styles';
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

  _handleDeleteAll() {
    this.dispatchEvent(new Event('task-list-deleted'));
  }

  _handleArchiveAll() {
    this.dispatchEvent(new Event('task-list-archived'));
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
                  .checked=${task.completed}
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

      <div class="action-bar bottom-bar">
        <button @click=${this._handleArchiveAll}>Archive all</button>
        <button class="danger" @click=${this._handleDeleteAll}>Delete all</button>
      </div>
    `;
  }
}

TaskList.styles = css`
  ${ul()}
  ${item}
  ${button(css`
    margin-right: 0.5rem;
  `)}
  ${actionBar}

  label {
    flex: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  input {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    align-self: baseline;
  }

  input:checked + span {
    text-decoration: line-through;
    opacity: 0.5;
  }
`;

defineCustomElement('task-list', withBasicStyles(TaskList));
