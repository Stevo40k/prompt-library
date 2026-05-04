import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-collection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-collection-dialog.component.html',
  styleUrls: ['./new-collection-dialog.component.scss']
})
export class NewCollectionDialogComponent {
  private dialogRef = inject(MatDialogRef<NewCollectionDialogComponent>);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.name);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
