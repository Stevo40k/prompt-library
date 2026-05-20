import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromptDialogComponent } from './new-prompt-dialog.component';

import { MatDialogRef } from '@angular/material/dialog';

describe('NewPromptDialogComponent', () => {
  let component: NewPromptDialogComponent;
  let fixture: ComponentFixture<NewPromptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPromptDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
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
