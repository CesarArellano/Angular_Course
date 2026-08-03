import { Component, inject, signal, debounced, linkedSignal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryService } from '../../services/country-service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'country-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {
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

      this.router.navigate([], { queryParams: { query: params.query } });

      return this.countryService.searchByCapital(params.query);
    },
  });

  // Second Option:
  // countryResource = resource({
  //   params: () => ({
  //     query: this.debouncedQuery.value(),
  //   }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCapital(params.query));
  //   },
  // });

  // First Option:
  // isLoading = signal(false);
  // isError = signal<string | null>(null);

  // countries = signal<Country[]>([]);

  // searchCapital(query: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchCapital(query).subscribe({
  //     next: (countries) => {
  //       this.countries.set(countries);
  //     },
  //     error: (error) => {
  //       console.log(error.message);

  //       this.isError.set(error.message);
  //       this.countries.set([]);
  //     },
  //     complete: () => {
  //       this.isLoading.set(false);
  //     },
  //   });
  // }
}
