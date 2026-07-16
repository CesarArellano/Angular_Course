import { Routes } from '@angular/router';

import { CountryLayoutComponent } from './layouts/country-layout/country-layout';

import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent,
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];

export default countryRoutes;
