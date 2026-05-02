import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NewPromptDialogComponent } from '../new-prompt-dialog/new-prompt-dialog.component';

export interface Prompt {
  title: string;
  snippet: string;
  tags: string[];
}

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
    FormsModule
  ],
  templateUrl: './prompt-dashboard.component.html',
  styleUrls: ['./prompt-dashboard.component.scss']
})
export class PromptDashboardComponent {
  private dialog = inject(MatDialog);

  // State
  searchQuery = signal('');
  viewMode = signal<'grid' | 'list'>('grid');
  prompts = signal<Prompt[]>([
    {
      title: 'Generate UI Component Scaffold',
      snippet: 'Create a functional React component for a data table. Props should include: columns, data, onSort. Use Tailwind CSS for styling. Ensure it handles empty states gracefully.',
      tags: ['#UI', '#React']
    },
    {
      title: 'Refactor Legacy Python Script',
      snippet: 'Review the following Python script. 1. Identify performance bottlenecks. 2. Update to use modern list comprehensions. 3. Add comprehensive type hints and docstrings. [INSERT_CODE_HERE]',
      tags: ['#Refactor', '#Python']
    },
    {
      title: 'API Endpoint Documentation',
      snippet: 'Generate Swagger/OpenAPI 3.0 documentation for a POST /users/auth endpoint. Inputs: email, password. Outputs: 200 OK (JWT token), 401 Unauthorized, 429 Too Many Requests.',
      tags: ['#API', '#Docs']
    }
  ]);

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
        this.prompts.update(currentPrompts => [result, ...currentPrompts]);
      }
    });
  }

  copyToClipboard(snippet: string) {
    navigator.clipboard.writeText(snippet);
    // In a real app, we'd trigger a MatSnackBar here per DESIGN.md
  }
}
