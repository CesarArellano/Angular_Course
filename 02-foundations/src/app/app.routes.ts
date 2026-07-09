import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page';
import { HeroPageComponent } from './pages/hero/hero-page';
import { DragonballComponent } from './pages/dragonball/dragonball';
import { DragonballSuperComponent } from './pages/dragonball-super/dragonball-super';

export const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent
  },
  {
    path: 'hero',
    component: HeroPageComponent
  },
  {
    path: 'dragonball',
    component: DragonballComponent
  },
  {
    path: 'dragonball-super',
    component: DragonballSuperComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
