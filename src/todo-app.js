import { LitElement, html, css } from 'lit-element';
import { withBasicStyles, withTasks } from './mixins';
import { defineCustomElement } from './utils';

import './components/task-form';
import './components/task-list';
import './components/archived-task-list';
import { box } from './styles';

class TodoApp extends withTasks(LitElement) {
  _handleTaskAdded({ detail: task }) {
    this.addTask(task);
  }

  _handleTaskStatusChanged({ detail: task }) {
    this.toggleTaskCompleted(task);
  }

  _handleTaskArchivedChanged({ detail: task }) {
    this.toggleTaskArchived(task);
  }

  _handleTaskDeleted({ detail: task }) {
    this.deleteTask(task);
  }

  get tasksNotArchived() {
    return this.tasks.filter((task) => !task.archived);
  }

  get tasksArchived() {
    return this.tasks.filter((task) => task.archived);
  }

  render() {
    return html`
      <div class="box">
        <task-form @task-added=${this._handleTaskAdded}></task-form>
        <task-list
          .tasks=${this.tasksNotArchived}
          @task-status-changed=${this._handleTaskStatusChanged}
          @task-archived=${this._handleTaskArchivedChanged}
        ></task-list>
      </div>

      <div class="box">
        <h2>Archived tasks</h2>
        <archived-task-list
          .tasks=${this.tasksArchived}
          @task-unarchived=${this._handleTaskArchivedChanged}
          @task-deleted=${this._handleTaskDeleted}
        ></archived-task-list>
      </div>
    `;
  }
}

TodoApp.styles = css`
  ${box}

  task-form {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0.5rem 0 1rem;
    padding: 0 0.5rem;
  }
`;

defineCustomElement('todo-app', withBasicStyles(TodoApp));
