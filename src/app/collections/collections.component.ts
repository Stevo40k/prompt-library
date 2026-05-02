import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Collection {
  id: string;
  name: string;
  updatedAt: string;
}

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
  collections = signal<Collection[]>([
    { id: '1', name: 'UI Components', updatedAt: 'Updated 2h ago' },
    { id: '2', name: 'SQL Snippets', updatedAt: 'Updated 1d ago' }
  ]);
}
