import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskService, Task } from 'src/app/core/service/task.service';
import { firstValueFrom } from 'rxjs';

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
      declarations: [TaskListComponent],
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
    let callCount = 0;

    const sub = component.stats$.subscribe((stats) => {
      callCount++;
      if (callCount === 1) {
        // initial
        expect(stats.total).toBe(3);
        expect(stats.concluidas).toBe(2);

        // push new state
        tasksSubject.next([
          { id: 1, title: 'A', completed: true },
        ]);
      } else if (callCount === 2) {
        expect(stats.total).toBe(1);
        expect(stats.concluidas).toBe(1);
        expect(stats.label).toBe('concluída');
        sub.unsubscribe();
        done();
      }
    });
  });

  it('trackById should return task id', () => {
    const task: Task = { id: 42, title: 'x', completed: false };
    expect(component.trackById(0, task)).toBe(42);
  });
});
