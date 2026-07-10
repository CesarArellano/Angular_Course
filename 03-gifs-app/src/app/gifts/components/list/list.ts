import { Component, input } from '@angular/core';
import { ListItemComponent } from './list-item/list-item';

interface Image {
	index: number;
}

@Component({
	selector: 'gifs-list',
	imports: [ListItemComponent],
	templateUrl: './list.html',
})
export class ListComponent {
	gifs = input.required<string[]>();
}
