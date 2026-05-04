import { Routes } from '@angular/router';
import { PromptDashboardComponent } from './prompt-dashboard/prompt-dashboard.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionDetailComponent } from './collections/collection-detail/collection-detail.component';

export const routes: Routes = [
  { path: 'library', component: PromptDashboardComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: 'collections/:id', component: CollectionDetailComponent },
  { path: '', redirectTo: '/library', pathMatch: 'full' }
];
