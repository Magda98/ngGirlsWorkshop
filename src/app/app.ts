import { Component, inject, signal } from '@angular/core';
import { InputButtonUnit } from './input-button-unit/input-button-unit';
import { TodoItem } from './todo-item/todo-item';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-root',
  imports: [InputButtonUnit, TodoItem],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly todoListService = inject(TodoListService);
  protected readonly todoItemSize = 52;
}
