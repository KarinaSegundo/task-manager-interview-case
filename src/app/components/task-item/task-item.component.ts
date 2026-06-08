import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskService } from '../../core/service/task.service';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input() task!: Task;

  constructor(private taskService: TaskService) {}

  onToggle() {
    this.taskService.toggleTaskCompletion(this.task.id);
  }

  onRemove() {
    this.taskService.removeTask(this.task.id);
  }
}
