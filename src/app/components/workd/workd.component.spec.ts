import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdComponent } from './workd.component';

describe('WorkdComponent', () => {
  let component: WorkdComponent;
  let fixture: ComponentFixture<WorkdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
