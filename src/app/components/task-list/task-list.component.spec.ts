import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskService } from 'src/app/core/service/task.service';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task.model';
import { Component, Input } from '@angular/core';
@Component({ selector: 'app-task-item', template: '' })
class StubTaskItemComponent { @Input() task: any; }

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const initialTasks: Task[] = [
    { id: 1, title: 'A', completed: false },
    { id: 2, title: 'B', completed: true },
    { id: 3, title: 'C', completed: true },
  ];

  let tasksSubject: BehaviorSubject<Task[]>;
  let mockTaskService: Partial<TaskService>;

  beforeEach(async () => {
    tasksSubject = new BehaviorSubject<Task[]>([...initialTasks]);

    mockTaskService = {
      tasks$: tasksSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent, StubTaskItemComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute stats correctly for initial tasks', async () => {
    const stats = await firstValueFrom(component.stats$);

    expect(stats.total).toBe(3);
    expect(stats.concluidas).toBe(2);
    expect(stats.label).toBe('concluídas');
  });

  it('should update stats when tasks change', (done) => {
    const results: any[] = [];

    component.stats$.pipe(take(2)).subscribe({
      next: (stats) => {
        results.push(stats);
        if (results.length === 1) {
          // initial
          expect(stats.total).toBe(3);
          expect(stats.concluidas).toBe(2);

          // push new state
          tasksSubject.next([
            { id: 1, title: 'A', completed: true },
          ]);
        }
      },
      complete: () => {
        // second emission assertions
        expect(results[1].total).toBe(1);
        expect(results[1].concluidas).toBe(1);
        expect(results[1].label).toBe('concluída');
        done();
      }
    });
  });

  it('trackById should return task id', () => {
    const task: Task = { id: 42, title: 'x', completed: false };
    expect(component.trackById(0, task)).toBe(42);
  });
});
