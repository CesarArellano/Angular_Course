import { Component, debounced, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryListComponent } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country-service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export default class ByCountryPageComponent {
  private countryService = inject(CountryService);

  query = signal<string>('');
  debouncedQuery = debounced(this.query, 500);

  countryResource = rxResource({
    params: () => ({
      query: this.debouncedQuery.value(),
    }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCountry(params.query);
    },
  });
}
