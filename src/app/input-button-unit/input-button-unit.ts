import { Component, model, output, signal } from '@angular/core';
import { form, required, validate, submit, Field } from '@angular/forms/signals';

@Component({
  selector: 'app-input-button-unit',
  imports: [Field],
  template: `
    <div class="app-input-button-unit">
      <input
        type="text"
        placeholder="Enter task"
        [field]="todoTaskForm.task"
        (keyup.enter)="$event.preventDefault(); saveTask()"
        [attr.aria-describedby]="'task-errors'"
      />
      <button class="todo-button" type="button" (click)="saveTask()">Save</button>
    </div>
    <div id="task-errors" class="error-message" role="alert">
      @if(todoTaskForm.task().errors()){ @for(error of todoTaskForm.task().errors(); track $index){
      <div class="error-item">{{ error.message }}</div>
      } }
    </div>
  `,
  styleUrl: './input-button-unit.scss',
})
export class InputButtonUnit {
  protected readonly addTask = output<string>();
  private readonly todoModel = signal({
    task: '',
  });

  todoTaskForm = form(this.todoModel, (path) => {
    required(path.task, { message: 'Please, enter a value', when: ({ state }) => state.dirty() });
  });

  protected saveTask() {
    this.todoTaskForm.task().markAsDirty();
    submit(this.todoTaskForm, async (form) => {
      const result = form().value();
      this.addTask.emit(result.task);
      form().reset();
      this.todoModel.set({ task: '' });
    });
  }
}
