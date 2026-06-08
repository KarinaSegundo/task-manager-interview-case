import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/core/service/task.service';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  loading$ = this.taskService.loading$;
  
  errorMessage: string = ''; 

  private currentTasks: Task[] = [];

  get hasError(): boolean {
    return this.errorMessage.length > 0;
  }

  constructor(private taskService: TaskService) {}

  // Inscreve-se no Observable para ter a lista sempre atualizada em tempo real
  private subs = new Subscription();
  ngOnInit() {
    this.subs.add(this.taskService.tasks$.subscribe(tasks => this.currentTasks = tasks));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  submitTask(inputElement: HTMLInputElement) {
    const value = inputElement.value.trim();
    
    if (value.length < 20) {
      this.errorMessage = 'Crie uma tarefa com pelo menos 20 caracteres.';
      return;
    }

    const apenasLetrasRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!apenasLetrasRegex.test(value)) {
      this.errorMessage = 'A tarefa não pode conter números ou caracteres especiais.';
      return;
    }

    const isDuplicate = this.currentTasks.some(
      task => task.title.toLowerCase() === value.toLowerCase()
    );

    if (isDuplicate) {
      this.errorMessage = 'Esta tarefa já foi adicionada à sua lista.';
      return;
    }

    this.errorMessage = '';
    this.taskService.addTask(value);
    inputElement.value = '';
  }

  clearError() {
    if (this.hasError) {
      this.errorMessage = '';
    }
  }
}