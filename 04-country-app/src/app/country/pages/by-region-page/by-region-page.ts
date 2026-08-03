import { Component, debounced, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country-service';
import { of } from 'rxjs';
import { Region, REGIONS } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateRegionParam(query: string): Region {
  if (!query) return 'Americas';
  if (REGIONS.includes(query as Region)) {
    return query as Region;
  }
  return 'Americas';
}

@Component({
  selector: 'country-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.html',
})
export class ByRegionPageComponent {
  REGIONS = REGIONS;

  private router = inject(Router);
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  regionQuery = linkedSignal<Region>(() => validateRegionParam(this.queryParam));
  debouncedRegion = debounced(this.regionQuery, 500);

  countryResource = rxResource({
    params: () => ({
      query: this.debouncedRegion.value(),
    }),
    stream: ({ params }) => {
      if (!params.query) {
        this.router.navigate([]);
        return of([]);
      }
      this.router.navigate([], { queryParams: { query: params.query } });
      return this.countryService.searchByRegion(params.query);
    },
  });

  onRegionSelected(region: Region) {
    this.regionQuery.set(region);
  }
}
