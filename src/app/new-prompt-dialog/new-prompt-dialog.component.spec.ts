import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromptDialogComponent } from './new-prompt-dialog.component';

describe('NewPromptDialogComponent', () => {
  let component: NewPromptDialogComponent;
  let fixture: ComponentFixture<NewPromptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPromptDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
