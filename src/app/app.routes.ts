import { Routes } from '@angular/router';
import { PromptDashboardComponent } from './prompt-dashboard/prompt-dashboard.component';
import { CollectionsComponent } from './collections/collections.component';

export const routes: Routes = [
  { path: 'library', component: PromptDashboardComponent },
  { path: 'collections', component: CollectionsComponent },
  { path: '', redirectTo: '/library', pathMatch: 'full' }
];
