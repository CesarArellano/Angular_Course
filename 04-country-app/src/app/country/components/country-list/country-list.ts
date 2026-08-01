import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Country } from '../../interfaces/country.interfaces';
import { CircularProgressIndicatorComponent } from '../../../shared/components/circular-progress-indicator/circular-progress-indicator';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [CircularProgressIndicatorComponent, DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
})
export class CountryListComponent {
  countries = input.required<Country[]>();
  isLoading = input<boolean>(false);
}
