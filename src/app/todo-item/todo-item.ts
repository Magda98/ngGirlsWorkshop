import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [FormsModule],
  template: `
    <div class="app-todo-item">
      <input
        type="checkbox"
        [checked]="checked()"
        (click)="toggleTask.emit()"
        [attr.aria-label]="'Toggle task: ' + taskTitle()"
      />
      @if(isEditing()) {
      <input type="text" placeholder="Enter task" [(ngModel)]="taskTitle" />
      <button class="todo-button" type="button" (click)="handleTaskEdit()">Save</button>
      } @else {
      <span
        class="app-todo-text"
        [class.app-todo-text--completed]="checked()"
        tabindex="0"
        role="button"
        type="button"
        [attr.aria-label]="'Edit task: ' + taskTitle()"
        (keyup.enter)="isEditing.set(true)"
        (click)="isEditing.set(true)"
        >{{ taskTitle() }}</span
      >
      }
      <button class="todo-button todo-button--danger" type="button" (click)="deleteTask.emit()">
        Remove
      </button>
    </div>
  `,
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  public readonly task = input.required<string>();
  public readonly checked = input.required<boolean>();
  public readonly deleteTask = output<void>();
  public readonly toggleTask = output<void>();
  public readonly editTask = output<string>();

  protected readonly isEditing = signal(false);

  handleTaskEdit() {
    this.editTask.emit(this.taskTitle());
    this.isEditing.set(false);
  }

  taskTitle = linkedSignal(this.task);
}
