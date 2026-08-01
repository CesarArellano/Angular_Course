import { Component, debounced, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryListComponent } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export default class ByCountryPageComponent {
  private countryService = inject(CountryService);

  query = signal<string>('');
  debouncedQuery = debounced(this.query, 300);

  countryResource = resource({
    params: () => ({
      query: this.debouncedQuery.value(),
    }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(this.countryService.searchByCountry(params.query));
    },
  });
}
