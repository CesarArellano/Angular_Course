import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CircularProgressIndicatorComponent } from '../../../shared/components/circular-progress-indicator/circular-progress-indicator';
import { CountryInformationComponent } from './country-information/country-information';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found';

@Component({
  selector: 'app-country-page',
  imports: [CircularProgressIndicatorComponent, CountryInformationComponent, NotFoundComponent],
  templateUrl: './country-page.html',
})
export class CountryPageComponent {
  private countryService = inject(CountryService);

  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => this.countryService.searchCountryByAlphaCode2(params.code),
  });
}
