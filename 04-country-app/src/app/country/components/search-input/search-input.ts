import { Component, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInputComponent {
  placeholder = input<string>('Search by');
  value = output<string>();

  initialValue = input<string>('');
  inputValue = linkedSignal<string>(() => this.initialValue());

  onSearch(value: string) {
    this.value.emit(value);
  }
}
