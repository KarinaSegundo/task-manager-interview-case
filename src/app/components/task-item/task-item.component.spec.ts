import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { TaskService } from '../../core/service/task.service';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { SharedModule } from 'src/app/shared/shared.module';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const task: Task = { id: 1, title: 'Tarefa de teste', completed: false };

  let mockTaskService: Partial<TaskService> & { removeTask: jasmine.Spy, toggleTaskCompletion: jasmine.Spy };

  beforeEach(async () => {
    mockTaskService = {
      removeTask: jasmine.createSpy('removeTask'),
      toggleTaskCompletion: jasmine.createSpy('toggleTaskCompletion'),
    };

    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      imports: [SharedModule],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = { ...task };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleTaskCompletion when checkbox is changed', () => {
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkbox.triggerEventHandler('change', { target: { checked: true } });

    expect(mockTaskService.toggleTaskCompletion).toHaveBeenCalledWith(task.id);
  });

  it('should call removeTask when remove button emits btnClick', () => {
    const button = fixture.debugElement.query(By.css('app-button'));
    // Simulate the custom event output by the button component
    button.triggerEventHandler('btnClick', null);

    expect(mockTaskService.removeTask).toHaveBeenCalledWith(task.id);
  });
});
