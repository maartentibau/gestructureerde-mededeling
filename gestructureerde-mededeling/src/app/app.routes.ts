import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', loadComponent: () => import('./components/main/main.component').then((mod) => mod.MainComponent) },
  {
    path: 'create',
    loadComponent: () => import('./components/create/create.component').then((mod) => mod.CreateComponent),
  },
  {
    path: 'generate',
    loadComponent: () => import('./components/generate/generate.component').then((mod) => mod.GenerateComponent),
  },
  {
    path: 'validate',
    loadComponent: () => import('./components/validate/validate.component').then((mod) => mod.ValidateComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./components/generate/generate.component').then((mod) => mod.GenerateComponent),
  },
];
