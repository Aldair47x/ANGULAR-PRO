import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Sould be 3', () => {
    const num1 = 1;
    const num2 = 2;
    const sum = num1 + num2;
    expect(sum).toBe(3);
  });

  it('Should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('Should render router-wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    const divClasses = divElement?.classList.value.split(' ');
    expect(divElement).not.toBeNull(); 

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });

  });

  
});
