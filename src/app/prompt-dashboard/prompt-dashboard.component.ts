import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NewPromptDialogComponent } from '../new-prompt-dialog/new-prompt-dialog.component';
import { PromptService, Prompt } from '../shared/prompt.service';

@Component({
  selector: 'app-prompt-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './prompt-dashboard.component.html',
  styleUrls: ['./prompt-dashboard.component.scss']
})
export class PromptDashboardComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private promptService = inject(PromptService);

  // State
  searchQuery = signal('');
  viewMode = signal<'grid' | 'list'>('grid');
  prompts = this.promptService.prompts;

  // Computed state for filtered prompts
  filteredPrompts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.prompts().filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.snippet.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }

  openNewPromptDialog() {
    const dialogRef = this.dialog.open(NewPromptDialogComponent, {
      width: '600px',
      panelClass: 'mustang-dialog'
    });

    dialogRef.afterClosed().subscribe((result: Prompt) => {
      if (result) {
        this.promptService.addPrompt(result.title, result.snippet, result.tags);
      }
    });
  }

  copyToClipboard(snippet: string) {
    navigator.clipboard.writeText(snippet).then(() => {
      this.snackBar.open('Prompt copied to clipboard', 'Close', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['mustang-snackbar']
      });
    });
  }
}
