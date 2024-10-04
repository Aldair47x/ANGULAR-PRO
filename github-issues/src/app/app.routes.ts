import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () => import('./modules/issues/pages/issues-list/issues-list-page.component').then(m => m.IssuesListPageComponent)
  },
  {
    path: 'issue/:id',
    loadComponent: () => import('./modules/issues/pages/issue/issue.component').then(m => m.IssueComponent)
  },
  {
    path: '**',
    redirectTo: 'issues'
  }
];
