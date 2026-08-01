import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RESTCountryResponse } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.countriesApiKey}`,
  });

  searchByCapital(query: string) {
    query = query.toLowerCase();
    return this.http
      .get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`, { headers: this.headers })
      .pipe(
        map((response) =>
          CountryMapper.fromCountryResponseArrayToCountryArray(response.data.objects),
        ),
      );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    return this.http
      .get<RESTCountryResponse>(`${API_URL}/name?q=${query}`, { headers: this.headers })
      .pipe(
        map((response) =>
          CountryMapper.fromCountryResponseArrayToCountryArray(response.data.objects),
        ),
      );
  }
}
