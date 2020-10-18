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
          @task-list-deleted=${this.deleteUnarchivedTasks}
          @task-list-archived=${this.archiveUnarchivedTasks}
        ></task-list>
      </div>

      <archived-task-list
        class="box"
        ?hidden=${!this.tasksArchived.length}
        .tasks=${this.tasksArchived}
        @task-unarchived=${this._handleTaskArchivedChanged}
        @task-deleted=${this._handleTaskDeleted}
        @task-list-deleted=${this.deleteArchivedTasks}
      ></archived-task-list>
    `;
  }
}

TodoApp.styles = css`
  ${box}

  task-form {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
`;

defineCustomElement('todo-app', withBasicStyles(TodoApp));
