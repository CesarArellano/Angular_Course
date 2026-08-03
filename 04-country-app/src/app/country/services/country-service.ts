import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RESTCountryResponse } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interfaces';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.countriesApiKey}`,
  });
  private queryCapitalCache = new Map<string, Country[]>();
  private queryCountryCache = new Map<string, Country[]>();
  private queryRegionCache = new Map<string, Country[]>();

  searchByCapital(query: string) {
    query = query.toLowerCase();
    if (this.queryCapitalCache.has(query)) {
      return of(this.queryCapitalCache.get(query) ?? []);
    }
    return this.http
      .get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`, { headers: this.headers })
      .pipe(
        map((response) =>
          CountryMapper.fromCountryResponseArrayToCountryArray(response.data.objects),
        ),
        tap((countries) => this.queryCapitalCache.set(query, countries)),
      );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    if (this.queryCountryCache.has(query)) {
      return of(this.queryCountryCache.get(query) ?? []);
    }

    return this.http
      .get<RESTCountryResponse>(`${API_URL}/name?q=${query}`, { headers: this.headers })
      .pipe(
        map((response) =>
          CountryMapper.fromCountryResponseArrayToCountryArray(response.data.objects),
        ),
        tap((countries) => this.queryCountryCache.set(query, countries)),
      );
  }

  searchCountryByAlphaCode2(code: string) {
    return this.http
      .get<RESTCountryResponse>(`${API_URL}/codes.alpha_2/${code}`, { headers: this.headers })
      .pipe(
        map((response) =>
          CountryMapper.fromCountryResponseArrayToCountryArray(response.data.objects),
        ),
        map((countries) => countries.at(0)),
      );
  }

  searchByRegion(region: Region) {
    if (this.queryRegionCache.has(region)) {
      return of(this.queryRegionCache.get(region) ?? []);
    }

    return this.http
      .get<RESTCountryResponse>(`${API_URL}/region/${region}`, { headers: this.headers })
      .pipe(
        map((response) =>
          CountryMapper.fromCountryResponseArrayToCountryArray(response.data.objects),
        ),
        tap((countries) => this.queryRegionCache.set(region, countries)),
      );
  }
}
