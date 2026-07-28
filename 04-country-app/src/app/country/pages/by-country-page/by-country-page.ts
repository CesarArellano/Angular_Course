import { Component, inject } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryListComponent } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country-service';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export default class ByCountryPageComponent {
  private countryService = inject(CountryService);
}
