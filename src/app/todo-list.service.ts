import { computed, effect, Injectable, signal } from '@angular/core';

export interface TodoItem {
  title: string;
  checked: boolean;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private readonly _todoList = signal<TodoItem[]>([]);

  public readonly todoList = computed(() => this._todoList());

  constructor() {
    this.loadFromLocalStorage();

    effect(() => {
      this.saveToLocalStorage();
    });
  }

  public addTodoItem(title: string) {
    const newItem: TodoItem = {
      title,
      checked: false,
      id: crypto.randomUUID(),
    };
    this._todoList.update((items) => [...items, newItem]);
  }

  public removeTodoItem(id: string) {
    this._todoList.update((items) => items.filter((item) => item.id !== id));
  }

  public toggleTodoItem(id: string) {
    this._todoList.update((items) =>
      items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }

  public editTodoItem(id: string, newTitle: string) {
    this._todoList.update((items) =>
      items.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
  }

  saveToLocalStorage() {
    const data = JSON.stringify(this._todoList());
    localStorage.setItem('todoList', data);
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('todoList');
    if (data) {
      const items: TodoItem[] = JSON.parse(data);
      this._todoList.set(items);
    }
  }
}
