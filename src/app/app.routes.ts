import { Routes } from '@angular/router';
import { PromptDashboardComponent } from './prompt-dashboard/prompt-dashboard.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionDetailComponent } from './collections/collection-detail/collection-detail.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'library', component: PromptDashboardComponent },
      { path: 'collections', component: CollectionsComponent },
      { path: 'collections/:id', component: CollectionDetailComponent },
      { path: '', redirectTo: 'library', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
