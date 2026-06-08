import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from 'src/app/core/service/task.service';
import { Task } from 'src/app/shared/models/task.model';
import { SharedModule } from 'src/app/shared/shared.module';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  const initialTasks: Task[] = [
    { id: 1, title: 'Estudar arquitetura de software', completed: false },
    { id: 2, title: 'Fazer compras no supermercado', completed: false },
    { id: 3, title: 'Praticar exercícios físicos', completed: false },
  ];

  let tasksSubject: BehaviorSubject<Task[]>;
  let mockTaskService: Partial<TaskService> & { addTask: jasmine.Spy };

  beforeEach(async () => {
    tasksSubject = new BehaviorSubject<Task[]>([...initialTasks]);

    mockTaskService = {
      tasks$: tasksSubject.asObservable(),
      loading$: of(false),
      addTask: jasmine.createSpy('addTask'),
    };

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [SharedModule],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit subscription
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error when task is shorter than 20 characters', () => {
    const input = document.createElement('input');
    input.value = 'curta tarefa'; // < 20

    component.submitTask(input);

    expect(component.errorMessage).toBe('Crie uma tarefa com pelo menos 20 caracteres.');
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
  });

  it('should set error when task contains non-letter characters', () => {
    const input = document.createElement('input');
    // length >= 20 but contains digits
    input.value = 'tarefa com numero 1234567890';

    component.submitTask(input);

    expect(component.errorMessage).toBe('A tarefa não pode conter números ou caracteres especiais.');
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
  });

  it('should set error when task is a duplicate (case-insensitive)', () => {
    const input = document.createElement('input');
    input.value = 'estudar arquitetura de software'; // same as initialTasks[0] but lowercase

    component.submitTask(input);

    expect(component.errorMessage).toBe('Esta tarefa já foi adicionada à sua lista.');
    expect(mockTaskService.addTask).not.toHaveBeenCalled();
  });

  it('should call addTask and clear input when task is valid', () => {
    const input = document.createElement('input');
    const value = 'Uma tarefa válida com mais de vinte chars';
    input.value = value;

    component.submitTask(input);

    expect(component.errorMessage).toBe('');
    expect(mockTaskService.addTask).toHaveBeenCalledWith(value);
    expect(input.value).toBe('');
  });

  it('clearError should clear the errorMessage when there is an error', () => {
    component['errorMessage'] = 'Erro qualquer';
    expect(component.hasError).toBeTrue();

    component.clearError();

    expect(component.errorMessage).toBe('');
    expect(component.hasError).toBeFalse();
  });
});
