import { Component, input } from '@angular/core';

@Component({
	selector: 'gifs-list-item',
	imports: [],
	templateUrl: './list-item.html',
})
export class ListItemComponent {
	url = input.required<string>();
}
