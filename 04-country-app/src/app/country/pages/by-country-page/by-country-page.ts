import { Component, debounced, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryListComponent } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country-service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.html',
})
export default class ByCountryPageComponent {
  private countryService = inject(CountryService);
  private router = inject(Router);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParam);
  debouncedQuery = debounced(this.query, 500);

  countryResource = rxResource({
    params: () => ({
      query: this.debouncedQuery.value(),
    }),
    stream: ({ params }) => {
      if (!params.query) {
        this.router.navigate([]);
        return of([]);
      }
      this.router.navigate([], {
        queryParams: { query: params.query },
      });
      return this.countryService.searchByCountry(params.query);
    },
  });
}
