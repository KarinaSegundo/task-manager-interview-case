import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit btnClick when clicked and not disabled/loading', () => {
    spyOn(component.btnClick, 'emit');

    component.disabled = false;
    component.loading = false;

    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    expect(component.btnClick.emit).toHaveBeenCalled();
  });

  it('should not emit when disabled', () => {
    spyOn(component.btnClick, 'emit');
    component.disabled = true;
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    expect(component.btnClick.emit).not.toHaveBeenCalled();
  });

  it('should not emit when loading', () => {
    spyOn(component.btnClick, 'emit');
    component.loading = true;
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    expect(component.btnClick.emit).not.toHaveBeenCalled();
  });

  it('should show spinner when loading', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should apply variant class', () => {
    component.variant = 'link';
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('link');
  });
});
