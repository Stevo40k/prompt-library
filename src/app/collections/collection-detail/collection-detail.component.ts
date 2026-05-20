import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PromptService, Collection, Prompt } from '../../shared/prompt.service';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss']
})
export class CollectionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private promptService = inject(PromptService);
  private snackBar = inject(MatSnackBar);

  collection = signal<Collection | undefined>(undefined);
  searchQuery = signal('');
  viewMode = signal<'grid' | 'list'>('grid');

  filteredPrompts = computed(() => {
    const col = this.collection();
    if (!col) return [];
    
    const query = this.searchQuery().toLowerCase();
    if (!query) return col.prompts;

    return col.prompts.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.snippet.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const found = this.promptService.getCollectionById(id);
        this.collection.set(found);
      }
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.snackBar.open('Prompt copied to clipboard', 'Close', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['mustang-snackbar']
      });
    });
  }
}
