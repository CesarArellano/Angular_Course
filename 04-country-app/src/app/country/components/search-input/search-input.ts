import { Component, input } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInputComponent {
  placeholder = input<string>('Search by');
  onSearch(value: string) {
    console.log({ value });
  }
}
