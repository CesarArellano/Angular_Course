import { Component } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryListComponent } from '../../components/country-list/country-list';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export class ByCountryPageComponent {}
