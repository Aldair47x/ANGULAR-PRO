import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page.component').then(m => m.PricingPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons-page/pokemons-page.component').then(m => m.PokemonsPageComponent)
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon-info/pokemon-info.component').then(m => m.PokemonInfoComponent)
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons-page/pokemons-page.component').then(m => m.PokemonsPageComponent)},
  {
    path: '**',
    redirectTo: 'about'
  }
];
