import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptDashboardComponent } from './prompt-dashboard.component';

describe('PromptDashboardComponent', () => {
  let component: PromptDashboardComponent;
  let fixture: ComponentFixture<PromptDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
