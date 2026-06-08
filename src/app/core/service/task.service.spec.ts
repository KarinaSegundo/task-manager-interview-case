import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from 'src/app/shared/models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial tasks', () => {
    let tasks: Task[] | undefined;
    service.tasks$.subscribe((t) => (tasks = t));
    expect(tasks?.length).toBe(3);
  });

  it('addTask should set loading true then add task after delay', fakeAsync(() => {
    const loadingValues: boolean[] = [];
    service.loading$.subscribe((v) => loadingValues.push(v));

    let tasks!: Task[];
    service.tasks$.subscribe((t) => (tasks = t));

    service.addTask('Nova tarefa');

    // loading should be true immediately after calling addTask
    expect(loadingValues[loadingValues.length - 1]).toBeTrue();
    expect(tasks.length).toBe(3);

    // advance virtual time to resolve the simulated API delay
    tick(2000);

    // loading should be false after API finishes and task should be added
    expect(loadingValues[loadingValues.length - 1]).toBeFalse();
    expect(tasks.length).toBe(4);
    expect(tasks.some((t) => t.title === 'Nova tarefa')).toBeTrue();
  }));

  it('removeTask should remove task by id', () => {
    let tasks!: Task[];
    service.tasks$.subscribe((t) => (tasks = t));
    const id = tasks[0].id;

    service.removeTask(id);

    expect(tasks.some((t) => t.id === id)).toBeFalse();
  });

  it('toggleTaskCompletion should invert completed', () => {
    let tasks!: Task[];
    service.tasks$.subscribe((t) => (tasks = t));
    const id = tasks[0].id;
    const before = tasks.find((t) => t.id === id)?.completed;

    service.toggleTaskCompletion(id);

    const after = tasks.find((t) => t.id === id)?.completed;
    expect(after).toBe(!before);
  });
});
