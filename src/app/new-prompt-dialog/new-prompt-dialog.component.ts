import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Prompt } from '../shared/prompt.service';

@Component({
  selector: 'app-new-prompt-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-prompt-dialog.component.html',
  styleUrls: ['./new-prompt-dialog.component.scss']
})
export class NewPromptDialogComponent {
  private dialogRef = inject(MatDialogRef<NewPromptDialogComponent>);
  private fb = inject(FormBuilder);

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  form = this.fb.group({
    title: ['', Validators.required],
    snippet: ['', Validators.required],
    tags: [[] as string[]]
  });

  get tagsControl() {
    return this.form.get('tags');
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const currentTags = this.tagsControl?.value || [];
      this.tagsControl?.setValue([...currentTags, value.startsWith('#') ? value : `#${value}`]);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const currentTags = this.tagsControl?.value || [];
    const index = currentTags.indexOf(tag);
    if (index >= 0) {
      currentTags.splice(index, 1);
      this.tagsControl?.setValue([...currentTags]);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value as Prompt);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
