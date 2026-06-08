import { Injectable } from '@angular/core';
import { delay, Observable, BehaviorSubject, of, finalize } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private mockTasks: Task[] = [
    { id: 1, title: 'Estudar arquitetura de software', completed: false },
    { id: 2, title: 'Fazer compras no supermercado', completed: false },
    { id: 3, title: 'Praticar exercícios físicos', completed: false },
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.mockTasks);
  tasks$ = this.tasksSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  addTask(description: string) {
    this.loadingSubject.next(true);

    const newTask: Task = { 
      id: Date.now(), 
      title: description, 
      completed: false 
    };

    // Fluxo reativo limpo
    this.callApi(newTask)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe((task) => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next([...currentTasks, task]);
      });
  }

  private callApi(task: Task): Observable<Task> {
    return of(task).pipe(
      delay(2000) // Simulação de latência de rede
    );
  }

  removeTask(id: number) {
    const updatedTasks = this.tasksSubject.getValue().filter(t => t.id !== id);
    this.tasksSubject.next(updatedTasks);
  }

  toggleTaskCompletion(id: number) {
    const updatedTasks = this.tasksSubject.getValue().map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next(updatedTasks);
  }
}