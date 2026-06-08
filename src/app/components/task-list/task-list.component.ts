import { Component } from '@angular/core';
import { TaskService } from 'src/app/core/service/task.service';
import { map } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks$ = this.taskService.tasks$;
  
  stats$ = this.tasks$.pipe(
    map(tasks => {
      const concluidas = tasks.filter(t => t.completed).length;
      return {
        total: tasks.length,
        concluidas: concluidas,
        label: concluidas === 1 ? 'concluída' : 'concluídas'
      };
    })
  );

  constructor(private taskService: TaskService) {}

  trackById(index: number, task: Task): number {
    return task.id;
  }
}