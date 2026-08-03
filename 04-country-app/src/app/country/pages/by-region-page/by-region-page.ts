import { Component, debounced, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country-service';
import { of } from 'rxjs';
import { Region, REGIONS } from '../../interfaces/region.type';

@Component({
  selector: 'country-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.html',
})
export class ByRegionPageComponent {
  REGIONS = REGIONS;

  countryService = inject(CountryService);
  regionQuery = signal<Region | null>(REGIONS[0]);

  debouncedRegion = debounced(this.regionQuery, 500);

  countryResource = rxResource({
    params: () => ({
      query: this.debouncedRegion.value(),
    }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByRegion(params.query);
    },
  });

  onRegionSelected(region: Region) {
    this.regionQuery.set(region);
  }
}
