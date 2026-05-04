import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewCollectionDialogComponent } from './new-collection-dialog/new-collection-dialog.component';
import { PromptService } from '../shared/prompt.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  public promptService = inject(PromptService);

  searchQuery = signal('');

  filteredCollections = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const cols = this.promptService.collections();
    if (!query) return cols;
    return cols.filter(c => c.name.toLowerCase().includes(query));
  });

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  navigateTo(id: string) {
    this.router.navigate(['/collections', id]);
  }

  openNewCollectionDialog() {
    const dialogRef = this.dialog.open(NewCollectionDialogComponent, {
      width: '500px',
      panelClass: 'mustang-dialog'
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.promptService.addCollection(name);
      }
    });
  }
}
