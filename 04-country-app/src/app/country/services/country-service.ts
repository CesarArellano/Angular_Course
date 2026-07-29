import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.countriesApiKey}`,
  });

  searchCapital(query: string) {
    query = query.toLowerCase();
    return this.http.get(`${API_URL}/capitals/${query}`, { headers: this.headers });
  }
}
