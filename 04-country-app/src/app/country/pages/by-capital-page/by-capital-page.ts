import { Component } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list';
import { SearchInputComponent } from '../../components/search-input/search-input';

@Component({
  selector: 'country-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {}
