import { Country } from '../interfaces/country.interfaces';
import { RestCountry } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static fromCountryResponseToCountry(country: RestCountry): Country {
    return {
      uuid: country.uuid,
      flag: country.flag.emoji,
      flagSvg: country.flag.url_svg,
      name: country.names.translations['spa'].common ?? country.names.common,
      capital: country.capitals[0].name,
      population: country.population,
    };
  }

  static fromCountryResponseArrayToCountryArray(countries: RestCountry[]): Country[] {
    return countries.map(this.fromCountryResponseToCountry);
  }
}
