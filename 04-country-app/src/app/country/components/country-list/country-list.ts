import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.html',
})
export class CountryListComponent {
  countries = input<Country[]>([]);
}
