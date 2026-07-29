import { Component, inject } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list';
import { SearchInputComponent } from '../../components/search-input/search-input';
import { CountryService } from '../../services/country-service';

@Component({
  selector: 'country-by-capital-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPageComponent {
  private countryService = inject(CountryService);

  searchCapital(query: string) {
    this.countryService.searchCapital(query).subscribe((response) => {
      console.log(response);
    });
  }
}
