import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewCollectionDialogComponent } from './new-collection-dialog/new-collection-dialog.component';
import { PromptService } from '../shared/prompt.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  public promptService = inject(PromptService);

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
