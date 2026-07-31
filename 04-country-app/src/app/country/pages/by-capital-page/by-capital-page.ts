import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'country-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {
  private countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);

  countries = signal<Country[]>([]);

  searchCapital(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchCapital(query).subscribe({
      next: (countries) => {
        this.countries.set(countries);
      },
      error: (error) => {
        console.log(error.message);

        this.isError.set(error.message);
        this.countries.set([]);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
