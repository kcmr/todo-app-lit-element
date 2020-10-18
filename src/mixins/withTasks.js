import { storage } from '../utils';

let tasks = [];

function toggleProperty(value, property) {
  return tasks.map((task) => ({
    ...task,
    [property]: task.id === value.id ? !task[property] : task[property],
  }));
}

function saveTasks(value) {
  storage.set('tasks', value);
}

function getTasks() {
  if (tasks.length) {
    return tasks;
  }

  tasks = storage.get('tasks', []);

  return tasks;
}

class Task {
  constructor(task) {
    this.label = task;
    this.completed = false;
    this.id = `task-${performance.now()}`;
    this.archived = false;
  }
}

export const withTasks = (SuperClass) =>
  class WithTasks extends SuperClass {
    get tasks() {
      return getTasks();
    }

    set tasks(value) {
      tasks = value;
      saveTasks(tasks);

      if (super.requestUpdate) {
        super.requestUpdate();
      }
    }

    addTask(task) {
      this.tasks = tasks.concat(new Task(task));
    }

    toggleTaskArchived(task) {
      this.tasks = toggleProperty(task, 'archived');
    }

    toggleTaskCompleted(task) {
      this.tasks = toggleProperty(task, 'completed');
    }

    deleteTask(task) {
      this.tasks = tasks.filter((t) => t.id !== task.id);
    }

    deleteArchivedTasks() {
      this.tasks = tasks.filter((t) => !t.archived);
    }

    deleteUnarchivedTasks() {
      this.tasks = tasks.filter((t) => t.archived);
    }

    archiveUnarchivedTasks() {
      this.tasks = tasks.map((t) => ({
        ...t,
        ...(!t.archived && { archived: true }),
      }));
    }
  };
